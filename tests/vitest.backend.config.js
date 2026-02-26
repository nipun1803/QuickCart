import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from the backend folder
dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });

export default defineConfig({
    root: __dirname,
    test: {
        globals: true,
        environment: 'node',
        include: ['./unit/backend/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../backend'),
        },
    },
});
