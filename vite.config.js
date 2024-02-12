import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'
// import viteCompression from 'vite-plugin-compression';
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        compression()
        // viteCompression({algorithm: 'brotliCompress'})
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (
                        id.includes('react-router-dom') ||
                        id.includes('react-router')
                    ) {
                        return '@react-router';
                    }
                    if (id.includes('@geist-ui/core')) {
                        return '@geist-ui-core'
                    }
                },
            },
        },
    },
})
