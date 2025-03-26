import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup'
import {vitePluginOpml} from "./app/content/workflowy/vite-plugin-opml.ts";
import remarkGfm from 'remark-gfm';
import Sitemap from 'vite-plugin-sitemap'
import getPrerenderRoutes from "./pre-render-routes.js"
import { imagetools } from 'vite-imagetools'

const siteMapArgs = getPrerenderRoutes(true);

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
    tsconfigPaths(),

    Sitemap({
      ...siteMapArgs,
      hostname: 'https://ocdevel.com',
      outDir: "build/client",
    }),

    imagetools()
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
