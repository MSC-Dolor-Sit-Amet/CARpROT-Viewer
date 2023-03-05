import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { rmSync } from 'node:fs';
import electron from 'vite-electron-plugin';
import { loadViteEnv } from 'vite-electron-plugin/plugin';
import renderer from 'vite-plugin-electron-renderer';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync('dist-electron', { recursive: true, force: true });

  const sourcemap = command === 'serve' || !!process.env.VSCODE_DEBUG;

  return {
    plugins: [
      react(),
      electron({
        include: ['electron'],
        transformOptions: {
          sourcemap,
        },
        plugins: [
          // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
          loadViteEnv(),
        ],
      }),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: true,
      }),
    ],
    server: process.env.VSCODE_DEBUG
      ? (() => {
          const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
          return {
            host: url.hostname,
            port: +url.port,
            cors: false,
          };
        })()
      : undefined,
    clearScreen: false,
  };
});
