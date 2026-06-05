import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-router-dom',
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/material/styles',
      '@mui/icons-material',
      'react-simple-maps',
    ],
  },
  build: {
    rollupOptions: {
      external: [], 
    },
  },
});
