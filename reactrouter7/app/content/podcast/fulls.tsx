import map from 'lodash/map'
import keyBy from 'lodash/keyBy'

import * as mlg001 from './mlg/001/route.mdx'
import * as mlg002 from './mlg/002/route.mdx'
import * as mlg003 from './mlg/003/route.mdx'
import * as mlg004 from './mlg/004/route.mdx'
import * as mlg005 from './mlg/005/route.mdx'
import * as mlg006 from './mlg/006/route.mdx'
import * as mlg007 from './mlg/007/route.mdx'
import * as mlg008 from './mlg/008/route.mdx'
import * as mlg009 from './mlg/009/route.mdx'
import * as mlg010 from './mlg/010/route.mdx'
import * as mlg011 from './mlg/011/route.mdx'
import * as mlg012 from './mlg/012/route.mdx'
import * as mlg013 from './mlg/013/route.mdx'
import * as mlg014 from './mlg/014/route.mdx'
import * as mlg015 from './mlg/015/route.mdx'
import * as mlg016 from './mlg/016/route.mdx'
import * as mlg017 from './mlg/017/route.mdx'
import * as mlg018 from './mlg/018/route.mdx'
import * as mlg019 from './mlg/019/route.mdx'
import * as mlg020 from './mlg/020/route.mdx'
import * as mlg021 from './mlg/021/route.mdx'
import * as mlg022 from './mlg/022/route.mdx'
import * as mlg023 from './mlg/023/route.mdx'
import * as mlg024 from './mlg/024/route.mdx'
import * as mlg025 from './mlg/025/route.mdx'
import * as mlg026 from './mlg/026/route.mdx'
import * as mlg027 from './mlg/027/route.mdx'
import * as mlg028 from './mlg/028/route.mdx'
import * as mlg029 from './mlg/029/route.mdx'
import * as mlg030 from './mlg/030/route.mdx'
import * as mla001 from './mla/001/route.mdx'
import * as mla002 from './mla/002/route.mdx'
import * as mla003 from './mla/003/route.mdx'
import * as mla004 from './mla/004/route.mdx'
import * as mla005 from './mla/005/route.mdx'
import * as mla006 from './mla/006/route.mdx'
import * as mla007 from './mla/007/route.mdx'
import * as mla008 from './mla/008/route.mdx'
import * as mla009 from './mla/009/route.mdx'
import * as mla010 from './mla/010/route.mdx'
import * as mla011 from './mla/011/route.mdx'
import * as mla012 from './mla/012/route.mdx'
import * as mlg031 from './mlg/031/route.mdx'
import * as mlg032 from './mlg/032/route.mdx'
import * as mla013 from './mla/013/route.mdx'
import * as mla014 from './mla/014/route.mdx'
import * as mla015 from './mla/015/route.mdx'
import * as mla016 from './mla/016/route.mdx'
import * as mla017 from './mla/017/route.mdx'
import * as mla018 from './mla/018/route.mdx'
import * as mla019 from './mla/019/route.mdx'
import * as mla020 from './mla/020/route.mdx'
import * as mlg033 from './mlg/033/route.mdx'
import * as mla022 from './mla/022/route.mdx'

import * as llh001 from './llh/1/route.mdx'
import * as llh002 from './llh/2/route.mdx'
import * as llh003 from './llh/3/route.mdx'
import * as llh004 from './llh/4/route.mdx'

export {mlgShow} from "./metas.js"
export {mlaShow} from "./metas.js"
export {llhShow} from "./metas.js"

export const mlgList = map([
  mlg001,
  mlg002,
  mlg003,
  mlg004,
  mlg005,
  mlg006,
  mlg007,
  mlg008,
  mlg009,
  mlg010,
  mlg011,
  mlg012,
  mlg013,
  mlg014,
  mlg015,
  mlg016,
  mlg017,
  mlg018,
  mlg019,
  mlg020,
  mlg021,
  mlg022,
  mlg023,
  mlg024,
  mlg025,
  mlg026,
  mlg027,
  mlg028,
  mlg029,
  mlg030,

  mla001,
  mla002,
  mla003,
  mla004,
  mla005,
  mla006,
  mla007,
  mla008,
  mla009,
  mla010,
  mla011,
  mla012,

  mlg031,
  mlg032,

  mla013,
  mla014,
  mla015,
  mla016,
  mla017,
  mla018,
  mla019,
  mla020,

  mlg033,
  mla022,
], e => ({
  mlg: !e.mla,
  id: e.mla ? `mla-${e.episode}` : e.episode,
  ...e,
}))
export const mlgObj = keyBy(mlgList, 'id')

export const llhList = [
  llh001,
  llh002,
  llh003,
  llh004,
]
export const llhObj = keyBy(llhList, 'id')