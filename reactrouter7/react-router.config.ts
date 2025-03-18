import type { Config } from "@react-router/dev/config";
import getPrerenderRoutes from "./pre-render-routes.js";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  // ssr: false,
  
  async prerender() {
    return getPrerenderRoutes(false);
  },
} satisfies Config;
