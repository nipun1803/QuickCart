import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '../');

export default defineConfig({
    root: projectRoot,
    cache: {
        dir: path.resolve(__dirname, './.vitest-cache')
    },
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: [path.resolve(__dirname, './unit/frontend/setup.js')],
        include: ['./tests/unit/frontend/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
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
        },
    },
});
