import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import AccountPage from '../../../frontend/src/pages/AccountPage';
import { AuthProvider } from '../../../frontend/src/context/AuthContext';
import api from '../../../frontend/src/utils/api';

// Mock dependencies — use vi.hoisted so factory can reference these
const { mockToastSuccess, mockToastError } = vi.hoisted(() => ({
    mockToastSuccess: vi.fn(),
    mockToastError: vi.fn(),
}));

vi.mock('../../../frontend/src/utils/api', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        interceptors: {
            response: { use: vi.fn() },
        },
        create: vi.fn(),
    },
}));

vi.mock('react-hot-toast', () => ({
    default: Object.assign(vi.fn(), {
        success: mockToastSuccess,
        error: mockToastError,
    }),
}));

describe('AccountPage Integration', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should allow a user to sign in with email and password', async () => {
        // 1. Setup mock responses
        api.post.mockResolvedValue({
            data: { _id: '123', name: 'Test User', email: 'test@example.com', role: 'user' }
        });
        api.get.mockResolvedValue({
            data: { _id: '123', name: 'Test User', email: 'test@example.com', role: 'user' }
        });

        // 2. Render Page
        render(
            <MemoryRouter>
                <AuthProvider>
                    <AccountPage />
                </AuthProvider>
            </MemoryRouter>
        );

        // 3. Fill the form
        const emailInput = screen.getByPlaceholderText(/name@email.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitBtn = screen.getByRole('button', { name: /Sign In Now/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com', name: 'email' } });
        fireEvent.change(passwordInput, { target: { value: 'password123', name: 'password' } });

        // 4. Submit
        fireEvent.click(submitBtn);

        // 5. Verify API call
        await waitFor(() => {
            expect(api.post).toHaveBeenCalledWith('/auth/login', {
                name: '',
                email: 'test@example.com',
                password: 'password123'
            });
        });

        // 6. Verify toast notification
        await waitFor(() => {
            expect(mockToastSuccess).toHaveBeenCalledWith('Welcome back!');
        });
    });

    it('should show an error message when authentication fails', async () => {
        // 1. Setup mock error
        api.post.mockRejectedValue({
            response: { data: { message: 'Invalid credentials' } }
        });

        render(
            <MemoryRouter>
                <AuthProvider>
                    <AccountPage />
                </AuthProvider>
            </MemoryRouter>
        );

        const emailInput = screen.getByPlaceholderText(/name@email.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);
        const submitBtn = screen.getByRole('button', { name: /Sign In Now/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com', name: 'email' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong', name: 'password' } });
        fireEvent.click(submitBtn);

        // 5. Verify error display
        await waitFor(() => {
            expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(mockToastError).toHaveBeenCalledWith('Invalid credentials');
        });
    });
});
