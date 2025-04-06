import {transform as walkingDesk} from './walking-desk'
import {transform as mlgResources} from './mlg-resources'

export const vitePluginOpml = {
  name: 'vite-plugin-opml',
  async transform(code: string, id: string) {
    let obj: object | null = null;
    if (id.endsWith('walking-desk.opml')) {
      obj = walkingDesk(code,id);
    }
    if (id.endsWith('code-ai.opml')) {
      // FIXME make something more general
      obj = walkingDesk(code,id);
    }
    if (id.endsWith('mlg-resources.opml')) {
      obj = await mlgResources(code,id);
    }
    if (obj) {
      return {
        code: `export default ${JSON.stringify(obj)}`,
        map: null
      }
    }
  }
}