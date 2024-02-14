import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'
import {compression} from 'vite-plugin-compression2'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        compression({algorithm: 'brotliCompress'}),
        visualizer(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) return id.toString().split('node_modules/')[1].split('/')[0].toString();

                    if (id.includes('geist-ui')) return id.toString().split('geist-ui/')[1].split('/')[0].toString()

                    if (id.includes('react-dom/server')) return '@react-router-server';

                    if (id.includes('react-router-dom/server')) return '@react-router-dom-server'

                    if (id.includes('react-router')) return '@react-router';

                    if (id.includes('react-router-dom')) return '@react-router-dom'

                    if (id.includes('@geist-ui/core')) return '@guc'

                    if (id.includes('axios')) return '@axios'

                    if (id.includes('CustomHeader')) return '@mch'

                    if (id.includes('ContactsList')) return '@mccl'

                    if (id.includes('PolicyView')) return '@cpv'

                    if (id.includes('RequestForm')) return '@crf'

                    if (id.includes('js-cookie')) return '@jc'

                    if (id.includes('HomeText'))  return '@cht'

                    if (id.includes('useLanguage')) return '@cul'

                },
            },
        },
    },
})

