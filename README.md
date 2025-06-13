# 🎉 Evento

Güçlü ve modern etkinlik yönetim platformu. Next.js 15 ve React 19 ile geliştirilmiş, yüksek performanslı bir web
uygulaması.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Özellikler

- ⚡ **Next.js 15** ile yüksek performans
- 🎨 **Tailwind CSS 4** ile modern responsive tasarım
- 📱 **Mobile-first** yaklaşım
- 🌙 **Dark/Light theme** desteği
- 🔒 **TypeScript** ile tip güvenliği
- 🎭 **Geist Font** ile premium tipografi
- 🎬 **Scroll-based Animations** - Framer Motion ile etkileyici animasyonlar
- 🗄️ **Prisma ORM + SQLite** - Güçlü veritabanı yönetimi
- 📄 **Server-side Pagination** - Performanslı veri sayfalama
- ✅ **Zod Validation** - Güvenli form doğrulama
- 🏗️ **Advanced Patterns** - Enterprise-level kod mimarisi

## 🛠️ Teknoloji Stack

**Frontend**

- Next.js 15.3.3
- React 19.0.0
- TypeScript 5.8.3
- Tailwind CSS 4.1.10
- Framer Motion
- Zod

**Backend & Database**

- Prisma ORM
- SQLite

**Development Tools**

- ESLint 9
- PostCSS
- Geist Font Family

## 🚀 Hızlı Başlangıç

```bash
# 1. Repository'yi klonlayın
git clone https://github.com/biyonik/evento.git
cd evento

# 2. Bağımlılıkları yükleyin
npm install

# 3. Geliştirme sunucusunu başlatın
npm run dev
```

**🌐 Tarayıcınızda açın:** [http://localhost:3000](http://localhost:3000)

## 📜 Komutlar

```bash
# Geliştirme
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
```

## 📁 Proje Yapısı

```
evento/
├── src/
│   └── app/
│       ├── globals.css      # Global CSS tanımları
│       ├── layout.tsx       # Root layout bileşeni
│       └── page.tsx         # Ana sayfa bileşeni
├── public/
│   ├── file.svg            # Dosya ikonu
│   ├── globe.svg           # Dünya ikonu
│   ├── next.svg            # Next.js logosu
│   ├── vercel.svg          # Vercel logosu
│   └── window.svg          # Pencere ikonu
├── .gitignore              # Git ignore kuralları
├── README.md               # Proje dokümantasyonu
├── eslint.config.mjs       # ESLint konfigürasyonu
├── next.config.ts          # Next.js ayarları
├── package.json            # Proje bağımlılıkları
├── postcss.config.mjs      # PostCSS konfigürasyonu
└── tsconfig.json           # TypeScript ayarları
```

## 🎨 UI/UX Özellikleri

- **Responsive Design** - Mobil, tablet ve desktop uyumlu
- **Modern Typography** - Geist Sans & Geist Mono fontları
- **Adaptive Theming** - Sistem teması ile otomatik uyum
- **Optimized Images** - Next.js Image component ile
- **Accessibility** - ARIA standartlarına uygun

## 🚀 Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI ile
npm i -g vercel
vercel
```

### Diğer Platformlar

- **Netlify:** `npm run build` sonrası `.next` klasörünü deploy edin
- **Railway:** Git repository'yi bağlayın
- **Docker:** Dockerfile ile containerize edilebilir

## 🔧 Konfigürasyon

### PostCSS

```js
// postcss.config.mjs
const config = {
  plugins: ["@tailwindcss/postcss"],
};
```

### TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "jsx": "preserve"
  }
}
```

## 📊 Performans

- ⚡ **Core Web Vitals** optimize edilmiş
- 🖼️ **Image Optimization** otomatik
- 📦 **Bundle Size** minimize edilmiş
- 🔄 **Code Splitting** otomatik

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'feat: yeni özellik eklendi'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

MIT License - detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<div align="center">
  <strong>⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!</strong>
</div>