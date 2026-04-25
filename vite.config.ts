import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],

  build: {
    // Avisa si un chunk supera 1 MB
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Separa dependencias grandes en chunks cacheables independientemente
        manualChunks: {
          'react-vendor':  ['react', 'react-dom'],
          'router':        ['react-router-dom'],
          'framer-motion': ['framer-motion'],
          'mui-icons':     ['@mui/icons-material'],
        },
      },
    },
  },
});
