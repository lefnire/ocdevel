import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup'
import {vitePluginOpml} from "./app/content/workflowy/vite-plugin-opml.ts";
import remarkGfm from 'remark-gfm';

export default defineConfig({
  plugins: [
    // tailwindcss(),

    // MDX
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm],
      })
    },
    // OPML
    vitePluginOpml,

    reactRouter(),
    tsconfigPaths()
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
