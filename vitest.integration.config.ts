/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import swc from 'unplugin-swc';

export default defineConfig({
    test: {
        globals: true,
        dir: 'src/test/integration',
        exclude: ['node_modules/**', '.vscode', '.git', '.github'],
        setupFiles: ['dotenv/config'],
        sequence: {
            hooks: 'list',
        },
        coverage: {
            all: true,
            provider: 'istanbul',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage/integration',
            include: ['**/Infrastructure/**'],
            exclude: ['test/**'],
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
