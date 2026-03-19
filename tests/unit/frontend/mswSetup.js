import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Define the mock handlers
export const handlers = [
    // Mock the user profile endpoint
    http.get('http://localhost:5001/api/auth/profile', () => {
        return HttpResponse.json({
            _id: '123',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user'
        }, { status: 200 });
    }),

    // Mock the login endpoint
    http.post('http://localhost:5001/api/auth/login', async ({ request }) => {
        const body = await request.json();
        
        if (body.email === 'test@example.com' && body.password === 'password123') {
            return HttpResponse.json({
                _id: '123',
                name: 'Test User',
                email: 'test@example.com',
                role: 'user',
                token: 'mock-token'
            }, { status: 200 });
        }
        
        return HttpResponse.json({
            message: 'Invalid credentials'
        }, { status: 401 });
    }),
];

// Setup requests interception using the given handlers
export const server = setupServer(...handlers);
