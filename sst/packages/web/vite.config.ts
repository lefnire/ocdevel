import { defineConfig } from 'vite'
import {vitePluginOpml} from "./src/content/workflowy/vite-plugin-opml.ts";
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
