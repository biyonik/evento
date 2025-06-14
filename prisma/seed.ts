import { PrismaClient } from "../src/generated/prisma/client"


const prisma = new PrismaClient();

const events = [
    {
        id: "a1b2c3d4-e5f6-4789-a012-3456789abcde",
        name: "DJ Practice Session",
        slug: "dj-practice-session",
        city: "Austin",
        location: "Austin Music Hall",
        date: "2030-10-12T00:00:00.000Z",
        organizerName: "DJ Inc.",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Join us for an immersive DJ practice session at the DJ Beats Workshop! Whether you're a beginner aspiring to spin the decks or an experienced DJ looking to refine your skills, this event is tailored just for you. Dive into the world of beats, mixes, and electronic rhythms under the guidance of seasoned DJs and music producers. Showcase your skills during our open decks session. Share your favorite tracks, experiment with live remixing, and receive applause and feedback from a supportive audience.",
    },
    {
        id: "b2c3d4e5-f6g7-4890-b123-456789abcdef",
        name: "Harmony Festival",
        slug: "harmony-festival",
        city: "Austin",
        location: "Austin Convention Center",
        date: "2030-11-15T00:00:00.000Z",
        organizerName: "Music Enthusiasts LLC",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Harmony Festival is a celebration of all music genres, bringing together musicians, artists, and music enthusiasts from around the world. Experience a day filled with live performances, interactive workshops, and a vibrant atmosphere of creativity and harmony. Join us for an unforgettable musical journey!",
    },
    {
        id: "c3d4e5f6-g7h8-4901-c234-56789abcdef0",
        name: "3D Animation Workshop",
        slug: "3d-animation-workshop",
        city: "Austin",
        location: "Austin Convention Center",
        date: "2030-12-08T00:00:00.000Z",
        organizerName: "3D Animators Inc.",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Dive into the captivating world of 3D animation at our exclusive 3D Animation Masterclass! Whether you're an aspiring animator, a student studying animation, or a professional looking to enhance your skills, this workshop offers a unique opportunity to learn from industry experts and elevate your animation prowess.",
    },
    {
        id: "d4e5f6g7-h8i9-4012-d345-6789abcdef01",
        name: "Rock the City Concert",
        slug: "rock-the-city-concert",
        city: "Austin",
        location: "Austin Music Hall",
        date: "2030-11-18T00:00:00.000Z",
        organizerName: "Rock On Productions",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Get ready to rock out at Rock the City Concert! Experience electrifying performances by top rock bands, enjoy high-energy music, and immerse yourself in an unforgettable night of pure rock and roll.",
    },
    {
        id: "e5f6g7h8-i9j0-4123-e456-789abcdef012",
        name: "Artisan Craft Fair",
        slug: "artisan-craft-fair",
        city: "Seattle",
        location: "Seattle Exhibition Center",
        date: "2030-12-01T00:00:00.000Z",
        organizerName: "Craftsmanship Guild",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Discover unique handmade crafts and artworks at the Artisan Craft Fair. Meet talented artisans, shop for one-of-a-kind items, and support local craftsmanship. Join us for a day of creativity and craftsmanship.",
    },
    {
        id: "f6g7h8i9-j0k1-4234-f567-89abcdef0123",
        name: "Jazz Fusion Night",
        slug: "jazz-fusion-night",
        city: "Austin",
        location: "Austin Jazz Lounge",
        date: "2030-11-29T00:00:00.000Z",
        organizerName: "Groove Masters Productions",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Indulge in the smooth melodies and rhythmic beats of jazz fusion at Jazz Fusion Night. Experience world-class jazz performances, savor delicious cocktails, and immerse yourself in the soulful ambiance of live jazz music.",
    },
    {
        id: "g7h8i9j0-k1l2-4345-g678-9abcdef01234",
        name: "Indie Music Showcase",
        slug: "indie-music-showcase",
        city: "Austin",
        location: "Austin Indie Spot",
        date: "2030-11-25T00:00:00.000Z",
        organizerName: "Indie Vibes Records",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Discover the next big indie artists at the Indie Music Showcase. Experience live performances by emerging talents, support independent music, and be part of a vibrant community of music enthusiasts and artists.",
    },
    {
        id: "h8i9j0k1-l2m3-4456-h789-abcdef012345",
        name: "Global Food Festival",
        slug: "global-food-festival",
        city: "Seattle",
        location: "Seattle Waterfront Park",
        date: "2030-10-30T00:00:00.000Z",
        organizerName: "Foodie Ventures Inc.",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Embark on a culinary journey around the world at the Global Food Festival. Delight your taste buds with international cuisines, cooking demonstrations, and food tastings. Experience the flavors of different cultures in one delicious event.",
    },
    {
        id: "i9j0k1l2-m3n4-4567-i890-bcdef0123456",
        name: "Tech Innovators Summit",
        slug: "tech-innovators-summit",
        city: "Seattle",
        location: "Seattle Convention Center",
        date: "2030-11-15T00:00:00.000Z",
        organizerName: "InnovateTech Inc.",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "The Tech Innovators Summit is where visionaries, entrepreneurs, and tech enthusiasts converge. Explore the latest technological advancements, attend insightful keynotes from industry leaders, and participate in hands-on workshops. Connect with innovators, pitch your ideas, and be a part of shaping the future of technology.",
    },
    {
        id: "j0k1l2m3-n4o5-4678-j901-cdef01234567",
        name: "Enchanted Garden Gala",
        slug: "enchanted-garden-gala",
        city: "Austin",
        location: "Austin Museum of Art",
        date: "2030-12-02T00:00:00.000Z",
        organizerName: "Cultural Garden Society",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Step into a world of wonder at the Enchanted Garden Gala, a magical evening of art, music, and fantasy. Explore enchanting garden installations, experience live performances by world-class musicians and dancers, and indulge in gourmet delicacies. Dress in your most glamorous attire and immerse yourself in a night of elegance and enchantment.",
    },
    {
        id: "k1l2m3n4-o5p6-4789-k012-def012345678",
        name: "Comedy Extravaganza",
        slug: "comedy-extravaganza",
        city: "Austin",
        location: "Austin Laugh Factory",
        date: "2030-11-06T00:00:00.000Z",
        organizerName: "Laugh Productions",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Prepare for a night of laughter with top comedians from around the world. Enjoy stand-up, improv, and sketches that will have you in stitches!",
    },
    {
        id: "l2m3n4o5-p6q7-4890-l123-ef0123456789",
        name: "Science and Space Expo",
        slug: "science-space-expo",
        city: "Seattle",
        location: "Seattle Science Center",
        date: "2030-10-29T00:00:00.000Z",
        organizerName: "Cosmic Explorers Society",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Explore the wonders of science and space at this interactive expo. Engage in hands-on experiments, meet scientists, and learn about the mysteries of the universe.",
    },
    {
        id: "m3n4o5p6-q7r8-4901-m234-f0123456789a",
        name: "Fashion Runway",
        slug: "fashion-runway",
        city: "Austin",
        location: "Austin Fashion Week Venue",
        date: "2030-11-12T00:00:00.000Z",
        organizerName: "Chic Trends Agency",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Witness the latest trends on the runway. Top designers will showcase their collections, setting the stage for the future of fashion.",
    },
    {
        id: "n4o5p6q7-r8s9-4012-n345-0123456789ab",
        name: "Culinary Masterclass",
        slug: "culinary-masterclass",
        city: "Seattle",
        location: "Seattle Epicurean Institute",
        date: "2030-12-02T00:00:00.000Z",
        organizerName: "Gourmet Chefs Society",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Join renowned chefs for a culinary journey. Learn cooking techniques, taste exquisite dishes, and elevate your skills in the art of gastronomy.",
    },
    {
        id: "o5p6q7r8-s9t0-4123-o456-123456789abc",
        name: "Film Buffs Symposium",
        slug: "film-buffs-symposium",
        city: "Austin",
        location: "Austin Film Institute",
        date: "2030-11-08T00:00:00.000Z",
        organizerName: "Cinema Society",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "A gathering for film enthusiasts! Screen classic movies, engage in discussions with filmmakers, and gain insights into the world of cinema.",
    },
    {
        id: "p6q7r8s9-t0u1-4234-p567-23456789abcd",
        name: "Literary Salon",
        slug: "literary-salon",
        city: "Seattle",
        location: "Seattle & Co. Bookstore",
        date: "2030-12-15T00:00:00.000Z",
        organizerName: "Words Society",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Celebrate the written word at this literary gathering. Listen to readings by acclaimed authors, participate in book discussions, and embrace the magic of storytelling.",
    },
    {
        id: "q7r8s9t0-u1v2-4345-q678-3456789abcde",
        name: "Wellness Expo",
        slug: "wellness-expo",
        city: "Austin",
        location: "Austin Convention Center",
        date: "2030-11-30T00:00:00.000Z",
        organizerName: "Wellness Warriors Inc.",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Immerse yourself in the world of fitness and well-being. Attend fitness classes, learn about nutrition, and explore holistic approaches to health.",
    },
    {
        id: "r8s9t0u1-v2w3-4456-r789-456789abcdef",
        name: "Digital Art Symposium",
        slug: "digital-art-symposium",
        city: "Seattle",
        location: "Seattle Art Gallery",
        date: "2030-11-01T00:00:00.000Z",
        organizerName: "Tech Creatives Collective",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Discover the intersection of technology and art. Experience digital art installations, attend VR workshops, and meet digital artists pushing creative boundaries.",
    },
    {
        id: "s9t0u1v2-w3x4-4567-s890-56789abcdef0",
        name: "Dance Fusion Festival",
        slug: "dance-fusion-festival",
        city: "Austin",
        location: "Austin Street Dance Studio",
        date: "2030-11-28T00:00:00.000Z",
        organizerName: "Rhythm Revolution",
        imageUrl: "https://bytegrad.com/course-assets/images/rn-image-3.png",
        description:
            "Experience a blend of dance styles from around the world. Participate in dance workshops, watch electrifying performances, and dance the night away.",
    },
];

async function main() {
    console.log(`Start seeding ...`);

    for (const event of events) {
        const result = await prisma.event.upsert({
            where: { id: event.id },
            update: {},
            create: event,
        });
        console.log(`Created event with id: ${result.id}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });