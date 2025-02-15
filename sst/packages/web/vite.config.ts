import { defineConfig } from 'vite'
import {vitePluginOpml} from "./src/content/workflowy/vite-plugin-opml.ts";
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // MDX
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
      })
    },
    // OPML
    vitePluginOpml,
    // React
    react(),
  ],
})
