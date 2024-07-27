import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import fs from 'fs'
import path from 'path'

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, './cert/localhost.key')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert/localhost.crt'))
        },
        host: '0.0.0.0',
        port: 3000,
        proxy:{}
    }
});
