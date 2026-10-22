import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // The bot scene runs inside a worker, where the dev-only React Refresh helper (it needs `window`)
    // cannot load, so those two files are left out of hot reload.
    plugins: [react({exclude: [/heroBot\.worker\.tsx$/, /HeroBot\.tsx$/]}), tailwindcss()],
    // The hero bot's 3D runs in a module worker.
    worker: {format: 'es' as const},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
