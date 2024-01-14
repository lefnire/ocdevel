import {transform as walkingDesk} from './walking-desk.ts'
import {transform as mlgResources} from './mlg-resources.ts'

export const vitePluginOpml = {
  name: 'vite-plugin-opml',
  transform(code, id) {
    let obj: object;
    if (id.endsWith('walking-desk.opml')) {
      obj = walkingDesk(code,id);
    }
    if (id.endsWith('mlg-resources.opml')) {
      obj = mlgResources(code,id);
    }
    if (obj) {
      return {
        code: `export default ${JSON.stringify(obj)}`,
        map: null
      }
    }
  }
}