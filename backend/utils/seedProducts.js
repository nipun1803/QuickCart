// Seed Products Script
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const products = [
    {
        title: "Wireless Noise-Canceling Headphones",
        description: "Experience premium sound quality with robust active noise cancellations, 30-hour battery life, and ultra-comfortable ear cushions.",
        price: 249.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        rating: { rate: 4.8, count: 420 },
        stock: 50
    },
    {
        title: "Smart Led Watch Series 7",
        description: "Track your health metrics, receive notifications, and stay connected with this sleek, water-resistant smartwatch.",
        price: 399.00,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        rating: { rate: 4.5, count: 210 },
        stock: 30
    },
    {
        title: "Ergonomic Office Chair",
        description: "Boost productivity with this fully adjustable mesh chair designed for maximum lumbar support and all-day comfort.",
        price: 199.50,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
        rating: { rate: 4.7, count: 150 },
        stock: 20
    },
    {
        title: "Professional DSLR Camera Kit",
        description: "Capture stunning photos and 4K video with this 24MP DSLR camera. Includes 18-55mm lens and carrying bag.",
        price: 899.99,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
        rating: { rate: 4.9, count: 85 },
        stock: 12
    },
    {
        title: "Designer Polarized Sunglasses",
        description: "Protect your eyes in style with these premium aviator sunglasses featuring UV400 protection and durable metal frames.",
        price: 129.00,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
        rating: { rate: 4.6, count: 300 },
        stock: 100
    },
    {
        title: "Running Sneakers - Air Flow",
        description: "Lightweight and breathable running shoes designed for speed and comfort on any terrain.",
        price: 89.95,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        rating: { rate: 4.3, count: 1050 },
        stock: 200
    }
];

const seedData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
