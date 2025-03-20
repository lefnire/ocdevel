const SHOW_OLD = import.meta.env.PROD;

import Old from './route-old'
import New from './route-new'

export * from './meta.js'

export default function Route() {
  if (SHOW_OLD) {
    return <Old />
  }
  return <New />
}