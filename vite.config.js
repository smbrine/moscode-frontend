import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'



export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        compression({algorithm: 'brotliCompress'}),
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

