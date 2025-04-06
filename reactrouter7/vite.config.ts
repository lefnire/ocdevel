import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm';
import Sitemap from 'vite-plugin-sitemap'
import getPrerenderRoutes from "./pre-render-routes.js"
import { imagetools } from 'vite-imagetools'
import { visualizer } from "rollup-plugin-visualizer";

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
    // git-blame for OPML

    reactRouter(),
    tsconfigPaths(),

    Sitemap({
      ...siteMapArgs,
      hostname: 'https://ocdevel.com',
      outDir: "build/client",
    }),

    imagetools(),

    visualizer({
      open: true, // Automatically open report in browser
      gzipSize: true, // Show gzip size
      brotliSize: true, // Show brotli size
      filename: "dist/stats.html", // Output report file
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
