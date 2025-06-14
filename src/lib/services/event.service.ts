import {Event, PrismaClient} from "@/generated/prisma/client";

/**
 * EventService Sınıfı
 *
 * Bu sınıf, etkinlik (Event) verilerine erişim ve yönetim için tüm veritabanı işlemlerini
 * gerçekleştiren ana servis sınıfıdır. Singleton pattern kullanarak Prisma Client'ı
 * optimize eder ve development ortamında hot reload sırasında bağlantı sorunlarını önler.
 *
 * Özellikler:
 * - Prisma ORM kullanarak PostgreSQL/MySQL/SQLite veritabanlarına bağlanır
 * - Singleton pattern ile veritabanı bağlantılarını optimize eder
 * - TypeScript ile tip güvenliği sağlar
 * - Kapsamlı hata yönetimi içerir
 * - CRUD operasyonları ve gelişmiş arama özellikleri sunar
 *
 * Kullanım:
 * ```typescript
 * import { eventService } from './EventService';
 * const events = await eventService.getAll();
 * ```
 */
export class EventService {
    /**
     * Prisma Client instance'ı - veritabanı bağlantısı için kullanılır
     * readonly olarak tanımlanmış, constructor'dan sonra değiştirilemez
     */
    private readonly prismaClient: PrismaClient;

    /**
     * Constructor - EventService sınıfının yeni instance'ını oluşturur
     *
     * Prisma Client'ı singleton pattern kullanarak başlatır.
     * Bu sayede development ortamında hot reload sırasında
     * çoklu veritabanı bağlantısı oluşturulmasını önler.
     */
    constructor() {
        this.prismaClient = this.createPrismaClient();
    }

    /**
     * Prisma Client'ı singleton pattern ile oluşturur
     *
     * Development ortamında global scope'ta Prisma instance'ını saklar.
     * Bu sayede Next.js'in hot reload özelliği çalıştığında
     * her seferinde yeni bağlantı oluşturulmasını önler ve
     * "Too many connections" hatasından kaçınır.
     *
     * Production ortamında normal instance oluşturur.
     *
     * @returns {PrismaClient} Singleton Prisma Client instance'ı
     */
    private createPrismaClient(): PrismaClient {
        // Global scope'ta Prisma instance'ı için tip tanımlaması
        const globalForPrisma = globalThis as unknown as {
            prisma: PrismaClient | undefined;
        };

        // Eğer global scope'ta Prisma instance'ı yoksa yeni oluştur
        if (!globalForPrisma.prisma) {
            globalForPrisma.prisma = new PrismaClient();
        }

        // Development ortamında global instance'ı kullan
        // Production'da her seferinde yeni instance döndür
        if (process.env.NODE_ENV !== 'production') {
            return globalForPrisma.prisma;
        }

        return globalForPrisma.prisma;
    }

    /**
     * Şehir ismini standart formata dönüştürür
     *
     * Kullanıcıdan gelen şehir ismini temizler ve standart formata getirir:
     * - Başındaki ve sonundaki boşlukları temizler
     * - İlk harfi büyük, geri kalanını küçük yapar
     * - Tutarlı veri sorgulaması için normalize eder
     *
     * Örnek: "  aUSTin  " -> "Austin"
     *
     * @param {string} cityName - Normalize edilecek şehir ismi
     * @returns {string} Normalize edilmiş şehir ismi
     */
    private normalizeCityName(cityName: string): string {
        return cityName.trim().charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    }

    /**
     * Tüm etkinlikleri getirir
     *
     * Veritabanındaki tüm Event kayıtlarını sorgular ve döndürür.
     * Herhangi bir filtreleme veya sıralama uygulamaz.
     *
     * @returns {Promise<Event[]>} Tüm etkinliklerin listesi
     * @throws {Error} Veritabanı bağlantı hatası veya sorgu hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   const allEvents = await eventService.getAll();
     *   console.log(`Toplam ${allEvents.length} etkinlik bulundu`);
     * } catch (error) {
     *   console.error('Etkinlikler getirilemedi:', error.message);
     * }
     * ```
     */
    async getAll(page?: number) {
        const pageNumber = page ? Math.max(1, page || 1) : 1;
        const skip = (pageNumber - 1) * 9;

        try {
            const totalCount = await this.prismaClient.event.count();
            const events = await this.prismaClient.event.findMany({
                take: 9,
                skip: skip
            });
            return {
                events,
                totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / 9)
            }
        } catch (error) {
            console.error('Error fetching all events:', error);
            throw new Error('Failed to fetch events');
        }
    }

    /**
     * Belirli bir şehirdeki etkinlikleri getirir
     *
     * Verilen şehir ismine göre etkinlikleri filtreler.
     * Şehir ismini otomatik olarak normalize eder (ilk harf büyük, geri kalan küçük).
     * Case-insensitive arama yapar.
     *
     * @param {string} cityName - Aranacak şehir ismi
     * @param page
     * @returns {Promise<Event[]>} Belirtilen şehirdeki etkinliklerin listesi
     * @throws {Error} Şehir ismi boş ise veya veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   // "austin", "AUSTIN", "Austin" hepsi aynı sonucu verir
     *   const austinEvents = await eventService.getByCityName('austin');
     *   console.log(`Austin'de ${austinEvents.length} etkinlik var`);
     * } catch (error) {
     *   console.error('Şehir etkinlikleri getirilemedi:', error.message);
     * }
     * ```
     */
    async getByCityName(cityName: string, page?: number) {
        // Boş şehir ismi kontrolü
        if (!cityName.trim()) {
            throw new Error('City name cannot be empty');
        }

        const normalizedCity = this.normalizeCityName(cityName);

        const pageNumber = page ? Math.max(1, page || 1) : 1;
        const skip = (pageNumber - 1) * 9;

        try {
            const totalCount = await this.prismaClient.event.count({
                where: {
                    city: normalizedCity
                }
            });

            const events = await this.prismaClient.event.findMany({
                where: {
                    city: normalizedCity
                },
                orderBy: {
                    date: 'asc' // Tarihe göre artan sırada
                },
                take: 9,
                skip: skip
            });

            return {
                events,
                totalCount,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalCount / 9)
            }
        } catch (error) {
            console.error(`Error fetching events for city ${normalizedCity}:`, error);
            throw new Error(`Failed to fetch events for city: ${normalizedCity}`);
        }
    }

    /**
     * Slug'a göre tek bir etkinlik getirir
     *
     * URL-friendly slug değeri kullanarak benzersiz bir etkinlik bulur.
     * Slug, etkinlik isminden türetilen benzersiz bir tanımlayıcıdır.
     *
     * @param {string} slug - Aranacak etkinliğin slug değeri
     * @returns {Promise<Event | null>} Bulunan etkinlik veya null (bulunamadıysa)
     * @throws {Error} Slug boş ise veya veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   const event = await eventService.getBySlug('dj-practice-session');
     *   if (event) {
     *     console.log(`Etkinlik bulundu: ${event.name}`);
     *   } else {
     *     console.log('Etkinlik bulunamadı');
     *   }
     * } catch (error) {
     *   console.error('Etkinlik getirilemedi:', error.message);
     * }
     * ```
     */
    async getBySlug(slug: string): Promise<Event | null> {
        // Boş slug kontrolü
        if (!slug.trim()) {
            throw new Error('Slug cannot be empty');
        }

        try {
            return await this.prismaClient.event.findUnique({
                where: {
                    slug: slug.trim()
                }
            });
        } catch (error) {
            console.error(`Error fetching event by slug ${slug}:`, error);
            throw new Error(`Failed to fetch event with slug: ${slug}`);
        }
    }

    /**
     * ID'ye göre tek bir etkinlik getirir
     *
     * UUID formatındaki benzersiz ID kullanarak etkinlik bulur.
     * Veritabanındaki primary key ile arama yapar.
     *
     * @param {string} id - Aranacak etkinliğin benzersiz ID'si
     * @returns {Promise<Event | null>} Bulunan etkinlik veya null (bulunamadıysa)
     * @throws {Error} ID boş ise veya veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   const eventId = 'a1b2c3d4-e5f6-4789-a012-3456789abcde';
     *   const event = await eventService.getById(eventId);
     *   if (event) {
     *     console.log(`Etkinlik bulundu: ${event.name}`);
     *   } else {
     *     console.log('Bu ID ile etkinlik bulunamadı');
     *   }
     * } catch (error) {
     *   console.error('Etkinlik getirilemedi:', error.message);
     * }
     * ```
     */
    async getById(id: string): Promise<Event | null> {
        // Boş ID kontrolü
        if (!id.trim()) {
            throw new Error('ID cannot be empty');
        }

        try {
            return await this.prismaClient.event.findUnique({
                where: {
                    id: id.trim()
                }
            });
        } catch (error) {
            console.error(`Error fetching event by ID ${id}:`, error);
            throw new Error(`Failed to fetch event with ID: ${id}`);
        }
    }

    /**
     * Yaklaşan etkinlikleri getirir
     *
     * Bugünkü tarihten sonraki etkinlikleri tarihe göre artan sırada getirir.
     * İsteğe bağlı olarak sonuç sayısını sınırlayabilir.
     * Geçmiş etkinlikleri filtreler.
     *
     * @param {number} [limit] - Maksimum sonuç sayısı (opsiyonel)
     * @returns {Promise<Event[]>} Yaklaşan etkinliklerin tarihe göre sıralı listesi
     * @throws {Error} Veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   // Tüm yaklaşan etkinlikler
     *   const allUpcoming = await eventService.getUpcomingEvents();
     *
     *   // Sadece ilk 5 yaklaşan etkinlik
     *   const nextFive = await eventService.getUpcomingEvents(5);
     *
     *   console.log(`${nextFive.length} yaklaşan etkinlik bulundu`);
     * } catch (error) {
     *   console.error('Yaklaşan etkinlikler getirilemedi:', error.message);
     * }
     * ```
     */
    async getUpcomingEvents(limit?: number): Promise<Event[]> {
        try {
            return await this.prismaClient.event.findMany({
                where: {
                    date: {
                        gte: new Date() // Bugünden sonraki tarihler
                    }
                },
                orderBy: {
                    date: 'asc' // Tarihe göre artan sırada
                },
                take: limit // Limit belirtilmişse uygula
            });
        } catch (error) {
            console.error('Error fetching upcoming events:', error);
            throw new Error('Failed to fetch upcoming events');
        }
    }

    /**
     * Etkinliklerde metin tabanlı arama yapar
     *
     * Etkinlik adı, açıklaması ve organizatör isminde case-insensitive arama yapar.
     * Kısmi eşleşmeleri de bulur (LIKE sorgusu gibi).
     * Sonuçları tarihe göre sıralar.
     *
     * Arama yapılan alanlar:
     * - name (etkinlik adı)
     * - description (etkinlik açıklaması)
     * - organizerName (organizatör ismi)
     *
     * @param {string} searchTerm - Aranacak metin
     * @returns {Promise<Event[]>} Arama kriterlerine uyan etkinliklerin listesi
     * @throws {Error} Veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   // "music" kelimesini içeren tüm etkinlikler
     *   const musicEvents = await eventService.searchEvents('music');
     *
     *   // Boş arama terimi - boş array döner
     *   const emptyResult = await eventService.searchEvents('');
     *
     *   console.log(`"music" araması ${musicEvents.length} sonuç buldu`);
     * } catch (error) {
     *   console.error('Arama yapılamadı:', error.message);
     * }
     * ```
     */
    async searchEvents(searchTerm: string): Promise<Event[]> {
        // Boş arama terimi için boş array döndür
        if (!searchTerm.trim()) {
            return [];
        }

        const normalizedSearchTerm = searchTerm.trim();

        try {
            return await this.prismaClient.event.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: normalizedSearchTerm,
                            }
                        },
                        {
                            description: {
                                contains: normalizedSearchTerm,
                            }
                        },
                        {
                            organizerName: {
                                contains: normalizedSearchTerm,
                            }
                        }
                    ]
                },
                orderBy: {
                    date: 'asc' // Tarihe göre sırala
                }
            });
        } catch (error) {
            console.error(`Error searching events with term ${normalizedSearchTerm}:`, error);
            throw new Error(`Failed to search events with term: ${normalizedSearchTerm}`);
        }
    }

    /**
     * Belirli tarih aralığındaki etkinlikleri getirir
     *
     * Başlangıç ve bitiş tarihleri arasındaki etkinlikleri bulur.
     * Her iki tarih de dahil edilir (inclusive range).
     * Sonuçları tarihe göre artan sırada döndürür.
     *
     * @param {Date} startDate - Aralığın başlangıç tarihi (dahil)
     * @param {Date} endDate - Aralığın bitiş tarihi (dahil)
     * @returns {Promise<Event[]>} Belirtilen tarih aralığındaki etkinliklerin listesi
     * @throws {Error} Başlangıç tarihi bitiş tarihinden sonra ise veya veritabanı hatası durumunda
     *
     * @example
     * ```typescript
     * try {
     *   const startDate = new Date('2030-11-01');
     *   const endDate = new Date('2030-11-30');
     *
     *   const novemberEvents = await eventService.getEventsByDateRange(startDate, endDate);
     *   console.log(`Kasım ayında ${novemberEvents.length} etkinlik var`);
     * } catch (error) {
     *   console.error('Tarih aralığı sorgusu başarısız:', error.message);
     * }
     * ```
     */
    async getEventsByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
        // Tarih validasyonu - başlangıç tarihi bitiş tarihinden önce olmalı
        if (startDate >= endDate) {
            throw new Error('Start date must be before end date');
        }

        try {
            return await this.prismaClient.event.findMany({
                where: {
                    date: {
                        gte: startDate, // Büyük eşit (>=)
                        lte: endDate    // Küçük eşit (<=)
                    }
                },
                orderBy: {
                    date: 'asc' // Tarihe göre artan sırada
                }
            });
        } catch (error) {
            console.error(`Error fetching events between ${startDate} and ${endDate}:`, error);
            throw new Error('Failed to fetch events in date range');
        }
    }

    /**
     * Prisma Client bağlantısını güvenli şekilde kapatır
     *
     * Uygulama kapanırken veya servis artık kullanılmayacağında
     * veritabanı bağlantısını temiz bir şekilde sonlandırır.
     * Memory leak'leri ve açık bağlantıları önler.
     *
     * @returns {Promise<void>} Bağlantı kapatma işleminin tamamlanma promise'i
     *
     * @example
     * ```typescript
     * // Uygulama kapanırken
     * process.on('SIGINT', async () => {
     *   await eventService.disconnect();
     *   process.exit(0);
     * });
     *
     * // Test sonrasında
     * afterAll(async () => {
     *   await eventService.disconnect();
     * });
     * ```
     */
    async disconnect(): Promise<void> {
        await this.prismaClient.$disconnect();
    }
}

/**
 * EventService'in singleton instance'ı
 *
 * Uygulama genelinde kullanılmak üzere önceden oluşturulmuş
 * EventService instance'ı. Bu sayede her yerde aynı instance
 * kullanılır ve veritabanı bağlantıları optimize edilir.
 *
 * @example
 * ```typescript
 * import { eventService } from './EventService';
 *
 * // Doğrudan kullanım
 * const events = await eventService.getAll();
 * ```
 */
export const eventService: EventService = new EventService();