import { defineConfig } from 'vitest/config';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
