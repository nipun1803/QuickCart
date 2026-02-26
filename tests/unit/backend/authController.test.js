import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock dependencies before importing the controller
vi.mock('../../../backend/models/User.js', () => ({
    default: {
        findOne: vi.fn(),
        create: vi.fn(),
    }
}));

vi.mock('../../../backend/utils/generateToken.js', () => ({
    default: vi.fn(() => 'mock-jwt-token'),
}));

import User from '../../../backend/models/User.js';
import generateToken from '../../../backend/utils/generateToken.js';
import { register, login, logout } from '../../../backend/controllers/authController.js';

// Helper to create mock req/res
const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    res.cookie = vi.fn().mockReturnValue(res);
    return res;
};

describe('Auth Controller - Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // ─── REGISTER ───────────────────────────────────
    describe('register', () => {
        it('should register a new user and return 201', async () => {
            const req = {
                body: { name: 'Test User', email: 'test@example.com', password: 'pass123' }
            };
            const res = mockRes();

            User.findOne.mockResolvedValue(null); // no existing user
            User.create.mockResolvedValue({
                _id: 'abc123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user',
            });

            await register(req, res);

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(User.create).toHaveBeenCalledWith({
                name: 'Test User',
                email: 'test@example.com',
                password: 'pass123',
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    _id: 'abc123',
                    name: 'Test User',
                    email: 'test@example.com',
                })
            );
        });

        it('should return 400 if user already exists', async () => {
            const req = {
                body: { name: 'Test', email: 'existing@example.com', password: 'pass' }
            };
            const res = mockRes();

            User.findOne.mockResolvedValue({ email: 'existing@example.com' });

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                message: 'User already exists with this email'
            });
            expect(User.create).not.toHaveBeenCalled();
        });

        it('should return 500 on unexpected error', async () => {
            const req = {
                body: { name: 'Test', email: 'test@example.com', password: 'pass' }
            };
            const res = mockRes();

            User.findOne.mockRejectedValue(new Error('DB error'));

            await register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
        });
    });

    // ─── LOGIN ──────────────────────────────────────
    describe('login', () => {
        it('should login with valid credentials', async () => {
            const req = {
                body: { email: 'test@example.com', password: 'pass123' }
            };
            const res = mockRes();

            User.findOne.mockResolvedValue({
                _id: 'abc123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user',
                comparePassword: vi.fn().mockResolvedValue(true),
            });

            await login(req, res);

            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    _id: 'abc123',
                    email: 'test@example.com',
                })
            );
        });

        it('should return 401 for invalid credentials', async () => {
            const req = {
                body: { email: 'test@example.com', password: 'wrong' }
            };
            const res = mockRes();

            User.findOne.mockResolvedValue({
                comparePassword: vi.fn().mockResolvedValue(false),
            });

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
        });

        it('should return 401 when user not found', async () => {
            const req = {
                body: { email: 'noone@example.com', password: 'pass' }
            };
            const res = mockRes();

            User.findOne.mockResolvedValue(null);

            await login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
        });
    });

    // ─── LOGOUT ─────────────────────────────────────
    describe('logout', () => {
        it('should clear jwt cookie and return 200', () => {
            const req = {};
            const res = mockRes();

            logout(req, res);

            expect(res.cookie).toHaveBeenCalledWith('jwt', '', expect.objectContaining({
                httpOnly: true,
            }));
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Logged out successfully' });
        });
    });
});
