import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import type {HtmlTagDescriptor, Plugin} from 'vite';

/**
 * Starts downloading every lazily loaded chunk (the page sections and the 3D bot) as soon as the page
 * loads. `modulepreload` fetches and compiles them in parallel with the page but does not run them, so
 * rendering can still be staged without the files arriving late.
 */
function preloadLazyChunks(): Plugin {
  return {
    name: 'preload-lazy-chunks',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx): HtmlTagDescriptor[] {
        const bundle = ctx.bundle ?? {};
        return Object.values(bundle)
          .filter((chunk) => chunk.type === 'chunk' && chunk.isDynamicEntry)
          .map((chunk) => ({
            tag: 'link',
            attrs: {rel: 'modulepreload', crossorigin: '', href: '/' + chunk.fileName},
            injectTo: 'head',
          }));
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), preloadLazyChunks()],
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
