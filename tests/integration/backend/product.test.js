import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../../backend/server.js';
import Product from '../../../backend/models/Product.js';
import mongoose from 'mongoose';

describe('Product Integration Tests', () => {
    let testProductId;

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
        }
        await Product.deleteMany({ title: /Test Product/ });

        const product = await Product.create({
            title: 'Test Product 1',
            description: 'Test Description',
            price: 100,
            category: 'Electronics',
            image: 'test-image.jpg',
            stock: 10
        });
        testProductId = product._id;
    });

    afterAll(async () => {
        await Product.deleteMany({ title: /Test Product/ });
    });

    it('GET /api/products - should return all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('products');
        expect(Array.isArray(res.body.products)).toBe(true);
        expect(res.body.total).toBeGreaterThanOrEqual(1);
    });

    it('GET /api/products/:id - should return a single product', async () => {
        const res = await request(app).get(`/api/products/${testProductId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('title', 'Test Product 1');
    });

    it('GET /api/products/:id - should return 404 for invalid ID', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/products/${fakeId}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message', 'Product not found');
    });
});
