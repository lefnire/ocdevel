import { defineConfig } from 'vite'
import {vitePluginOpml} from "./src/content/podcast/resources/opml.vite-plugin";
import fs from 'fs';
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // MDX
    {enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */)},

    // OPML
    vitePluginOpml,

    // React
    react(),
  ],
})
