const mongoose = require('mongoose');
const Project = require('./models/Project');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const sampleProjects = [
    {
        title: "Crimson High-Gloss Showroom",
        description: "Bespoke metallic red epoxy application for a premium automotive showroom.",
        category: "Epoxy",
        location: "Okhla, New Delhi",
        city: "Delhi",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1JearKLXrwn_0IwTnBkUpl-Y9ZM_juSl5", public_id: "drive_1" }],
    },
    {
        title: "Luxe Residential Lobby",
        description: "Cream-toned microcement flooring for a high-end apartment building lobby.",
        category: "Microcement Flooring",
        location: "Worli, Mumbai",
        city: "Mumbai",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1-22ruUh-fVIt0Es7oSsQHiZhwuztjmpW", public_id: "drive_2" }],
    },
    {
        title: "Architectural Feature Wall",
        description: "Textured slate-grey microcement wall finish with custom artisanal strokes.",
        category: "Microcement Walls",
        location: "Golf Course Road, Gurgaon",
        city: "Delhi",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1voNGKWaMjg2Kl-_2Z7BeLbL7VKmJZIW_", public_id: "drive_3" }],
    },
    {
        title: "Industrial Studio Floor",
        description: "Heavy-duty microcement flooring for a professional design studio.",
        category: "Microcement Flooring",
        location: "Sector 62, Noida",
        city: "Delhi",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/131zuXpqy7nLanFDJwgXYfl2QSjhXNKgw", public_id: "drive_4" }],
    },
    {
        title: "Minimalist Wall Art",
        description: "Smooth ivory plaster finish for a minimalist modern home.",
        category: "Microcement Walls",
        location: "GK-2, South Delhi",
        city: "Delhi",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1zIg0gOncaZ1xnrHPO_v4iJhE9oTkCZoh", public_id: "drive_5" }],
    },
    {
        title: "Monolithic Ceiling Design",
        description: "Seamless concrete ceiling application for an architectural residence.",
        category: "Microcement Walls",
        location: "Indiranagar, Bangalore",
        city: "Bangalore",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/11OO8_pFDngbJm6IZGtmYRdiKvjJ8NEJC", public_id: "drive_6" }],
    },
    {
        title: "Bespoke Office Desk",
        description: "Coated executive desk with high-durability architectural finish.",
        category: "Countertops & Stairs",
        location: "Cyber Hub, Gurgaon",
        city: "Delhi",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1tOneG9mocNU90W6YDBiyaLpay-96zlme", public_id: "drive_7" }],
    },
    {
        title: "Luxury Reception Counter",
        description: "Glossy microcement counter for a high-end corporate office.",
        category: "Countertops & Stairs",
        location: "BKC, Mumbai",
        city: "Mumbai",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1wkY7TrwMt6a0SOBm3kHVIRTF2TiSWmMd", public_id: "drive_8" }],
    },
    {
        title: "Premium Surface Continuity",
        description: "Total surface overlay for a luxury residential property.",
        category: "Microcement Flooring",
        location: "Civil Lines, Delhi",
        city: "Delhi",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1XnFZIwf_bPUth0wIvgXnHAWGK2iX_L8l", public_id: "drive_9" }],
    },
    {
        title: "Decorative Wall Coating",
        description: "Stucco Veneziano inspired wall finish for a boutique space.",
        category: "Venetian Lime Plaster",
        location: "Koregaon Park, Pune",
        city: "Pune",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1LyT9vyKY2QnQzuevdDY5oU0kqtKLMrSu", public_id: "drive_10" }],
    },
    {
        title: "Modern Apartment Floor",
        description: "Silver grey microcement application for a contemporary apartment.",
        category: "Microcement Flooring",
        location: "HITEC City, Hyderabad",
        city: "Hyderabad",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1umWGSv0ae_lcVp2TxJnJefAA1JVxagsU", public_id: "drive_11" }],
    },
    {
        title: "Polished Concrete Aesthetic",
        description: "High-sheen concrete-look wall for a gallery space.",
        category: "Microcement Walls",
        location: "Adyar, Chennai",
        city: "Chennai",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1B8mjkyIHDY4vlZQ9tb0gIzNcGRIKC91J", public_id: "drive_12" }],
    },
    {
        title: "Commercial Shop Floor",
        description: "Monolithic shop floor with high traffic resistance.",
        category: "Microcement Flooring",
        location: "Ahmedabad",
        city: "Ahmedabad",
        isCommercial: true,
        images: [{ url: "https://lh3.googleusercontent.com/d/1hx98kSBT8vItis_WWGCeCzF6mqoJm8O9", public_id: "drive_13" }],
    },
    {
        title: "Minimalist Limewash",
        description: "Artisanal limewash wall finish for a serene residential space.",
        category: "Venetian Lime Plaster",
        location: "Chandigarh",
        city: "Chandigarh",
        isCommercial: false,
        images: [{ url: "https://lh3.googleusercontent.com/d/1lACapXgpBVRHGVZCsBqLDDJRtzgICPYh", public_id: "drive_14" }],
    }
];

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding projects...');

        await Project.deleteMany({});
        console.log('Cleared existing projects.');

        await Project.insertMany(sampleProjects);
        console.log(`Inserted ${sampleProjects.length} real projects successfully.`);

        mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Seeding Error:', err.message);
        process.exit(1);
    }
};

seedProjects();
