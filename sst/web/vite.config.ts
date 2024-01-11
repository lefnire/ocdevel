import { defineConfig } from 'vite'
import xml2js from 'xml2js';
import fs from 'fs';
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // MDX
    {enforce: 'pre', ...mdx(/* jsxImportSource: …, otherOptions… */)},

    // OPML
    {
      name: 'vite-plugin-opml',
      transform(code, id) {
        if (id.endsWith('.opml')) {
          const xml = fs.readFileSync(id, 'utf8');
          let jsObject;
          xml2js.parseString(xml, (err, result) => {
            if (err) {
              throw new Error(`Error parsing OPML file: ${id}`);
            }
            jsObject = result;
          });
          return {
            code: `export default ${JSON.stringify(jsObject)}`,
            map: null
          };
        }
      }
    },

    // React
    react(),
  ],
})
