/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
    test: {
        globals: true,
        dir: 'src/test/unit',
        exclude: ['node_modules/**', '.vscode', '.git', '.github'],
        setupFiles: ['dotenv/config'],
        coverage: {
            all: true,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage/unit',
            include: ['src/app/**'],
            exclude: ['**/Infrastructure/**', 'src/app/*.ts'],
            clean: true,
            cleanOnRerun: true,
            perFile: true,
            branches: 90,
            lines: 90,
            functions: 90,
            statements: 90,
        },
    },
    plugins: [swc.vite()],
});
