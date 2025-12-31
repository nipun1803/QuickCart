import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const users = await User.find({});
        console.log('Total Users:', users.length);
        console.table(users.map(u => ({
            id: u._id,
            name: u.name,
            email: u.email,
            role: u.role
        })));

        const admin = users.find(u => u.role === 'admin');
        if (admin) {
            console.log('✅ Admin user found:', admin.email);
        } else {
            console.log('❌ No admin user found!');
            console.log('You need to seed an admin user or update an existing user to role "admin".');
        }

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
