import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src')
        }
    },
    plugins: [vue()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            }
        }
    },
    // build: {
    //     target:'esnext'
    // }
})