import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: '.',         
  base: './',         
  build: {
    rollupOptions: {
    input: {
        main: resolve(__dirname, 'index.html'),
        contact: resolve(__dirname, 'contact.html'),
        calculatrice: resolve(__dirname, 'calculatrice.html')
    }
    },
    outDir: 'dist',
        
    emptyOutDir: true,
  },
  plugins: [
    tailwindcss()
  ],
});