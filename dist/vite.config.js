import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/grace-mark-masterpiece/',   // Use your GitHub repo name
});
