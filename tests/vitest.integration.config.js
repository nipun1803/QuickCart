import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';

const projectRoot = path.resolve(__dirname, '../');

// Load backend environment variables for DB-backed integration tests
dotenv.config({ path: path.resolve(projectRoot, 'backend/.env') });

export default defineConfig({
    root: projectRoot,
    plugins: [react()],
    test: {
        globals: true,
        projects: [
            {
                test: {
                    name: 'backend-integration',
                    environment: 'node',
                    include: ['tests/integration/backend/**/*.{test,spec}.{js,mjs,cjs,ts}'],
                    globals: true,
                    // Resolve backend dependencies from backend/node_modules
                    deps: {
                        moduleDirectories: [
                            path.resolve(projectRoot, 'backend/node_modules'),
                            'node_modules',
                        ],
                    },
                },
                resolve: {
                    alias: {
                        '@': path.resolve(projectRoot, 'backend'),
                        'mongoose': path.resolve(projectRoot, 'backend/node_modules/mongoose'),
                    },
                },
            },
            {
                extends: true,
                test: {
                    name: 'frontend-integration',
                    environment: 'jsdom',
                    include: ['tests/integration/frontend/**/*.{test,spec}.{js,jsx,ts,tsx}'],
                    globals: true,
                    setupFiles: [path.resolve(projectRoot, 'tests/unit/frontend/setup.js')],
                },
                resolve: {
                    alias: {
                        '@': path.resolve(projectRoot, 'frontend/src'),
                        'react': path.resolve(projectRoot, 'frontend/node_modules/react'),
                        'react-dom': path.resolve(projectRoot, 'frontend/node_modules/react-dom'),
                        'react-router-dom': path.resolve(projectRoot, 'frontend/node_modules/react-router-dom'),
                        '@testing-library/react': path.resolve(projectRoot, 'frontend/node_modules/@testing-library/react'),
                        '@testing-library/jest-dom': path.resolve(projectRoot, 'frontend/node_modules/@testing-library/jest-dom'),
                        '@testing-library/dom': path.resolve(projectRoot, 'frontend/node_modules/@testing-library/dom'),
                        'react-hot-toast': path.resolve(projectRoot, 'frontend/node_modules/react-hot-toast'),
                    },
                },
            },
        ],
    },
});
