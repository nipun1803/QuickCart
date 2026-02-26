import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../../backend/server.js';
import User from '../../../backend/models/User.js';
import mongoose from 'mongoose';

describe('Auth Integration Tests', () => {
    const testUser = {
        name: 'Test User',
        email: `test-${Date.now()}@example.com`,
        password: 'password123'
    };

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI);
        }
        await User.deleteMany({ email: /test.*@example\.com/ });
    });

    afterAll(async () => {
        await User.deleteMany({ email: /test.*@example\.com/ });
    });

    it('POST /api/auth/register - should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.body).not.toHaveProperty('password');
    });

    it('POST /api/auth/login - should login the user and return cookie', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: testUser.password
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('email', testUser.email);
        expect(res.headers['set-cookie']).toBeDefined();
    });

    it('POST /api/auth/login - should fail with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: testUser.email,
                password: 'wrongpassword'
            });

        expect(res.status).toBe(401);
    });
});
