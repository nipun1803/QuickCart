import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
    {
        title: "Men's Casual T-Shirt",
        description: "Comfortable cotton t-shirt perfect for everyday wear",
        price: 599,
        category: "Men",
        image: "https://res.cloudinary.com/donqbxlnc/image/upload/v1648516571/fashify/25d7ff1d-6680-4629-b7f8-dda51fb89dc61592396707535-Nautica-Men-Tshirts-3811592396706267-4_hxanis.webp",
        rating: 4.5,
        reviews: 128,
        stock: 50,
    },
    {
        title: "Men's Slim Fit Casual Shirt",
        description: "Stylish maroon slim fit casual shirt for boys",
        price: 899,
        category: "Kids",
        image: "https://res.cloudinary.com/donqbxlnc/image/upload/v1648516848/fashify/b33911a2-038f-419a-afd9-e7f7949310441639746739865AllenSollyJuniorBoysMaroonSlimFitCasualShirt1_k5fy77.webp",
        rating: 4.3,
        reviews: 85,
        stock: 30,
    },
    {
        title: "Men's Orange Brand Logo T-Shirt",
        description: "One8 x PUMA Men Orange Brand Logo Pure Cotton T-Shirt",
        price: 1299,
        category: "Men",
        image: "https://res.cloudinary.com/donqbxlnc/image/upload/v1648516584/fashify/494a0494-2127-485d-8324-28aafe60ca0f1646647959983-one8-x-PUMA-Men-Orange-Brand-Logo-One8Core-Pure-Cotton-Virat-1_vdlx2v.webp",
        rating: 4.7,
        reviews: 256,
        stock: 45,
    },
    {
        title: "Women's Floral Print Dress",
        description: "Beautiful floral print dress for women",
        price: 1499,
        category: "Women",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
        rating: 4.6,
        reviews: 142,
        stock: 25,
    },
    {
        title: "Women's Denim Jacket",
        description: "Classic denim jacket for all seasons",
        price: 1899,
        category: "Women",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        rating: 4.4,
        reviews: 98,
        stock: 20,
    },
    {
        title: "Kids Graphic T-Shirt",
        description: "Fun graphic t-shirt for kids",
        price: 499,
        category: "Kids",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500",
        rating: 4.2,
        reviews: 67,
        stock: 40,
    },
    {
        title: "Men's Formal Blazer",
        description: "Professional blazer for formal occasions",
        price: 2999,
        category: "Men",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
        rating: 4.8,
        reviews: 189,
        stock: 15,
    },
    {
        title: "Women's Summer Top",
        description: "Light and breezy summer top",
        price: 799,
        category: "Women",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        rating: 4.1,
        reviews: 73,
        stock: 35,
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany();
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        await Product.insertMany(products);
        console.log('✅ Sample products added');

        // Create admin user if doesn't exist
        const adminExists = await User.findOne({ email: 'admin@quickcart.com' });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: 'admin@quickcart.com',
                password: 'admin123',
                role: 'admin',
            });
            console.log('✅ Admin user created (email: admin@quickcart.com, password: admin123)');
        } else {
            console.log('ℹ️  Admin user already exists');
        }

        console.log('✅ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
