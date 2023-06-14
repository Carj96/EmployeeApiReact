import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: '/',
  },
  preprocessorOptions: {
    scss: {
      additionalData: '$injectedColor: orange;',
    },
  },
});
