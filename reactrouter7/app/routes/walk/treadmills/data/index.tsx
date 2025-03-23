import urevo_cyberpad from './urevo/cyberpad'
import urevo_strol2spro from './urevo/strol2spro'
import egofit_m2 from './egofit/m2'
import urevo_3s from './urevo/3s'
import urevo_2slite from './urevo/2slite'
import urevo_e5 from './urevo/e5'
import urevo_e4 from './urevo/e4'
import urevo_e3 from './urevo/e3'
import deerrun_q1mini from './deerrun/q1mini'
import egofit_m1pro from './egofit/m1pro'
import goyouth_2in1 from './goyouth/2in1'
import goplus from './goplus/goplus'
import walkingpad_z1 from './walkingpad/z1'
import lifespan_tr1000 from './lifespan/tr1000'
import lifespan_tr1200 from './lifespan/tr1200'
import lifespan_tr5000 from './lifespan/tr5000'
import imovr from './imovr/imovr'
import sperax_motioneaselitep1 from './sperax/motioneaselitep1'
import bifanuo_tm008 from './bifanuo/tm008'
import yagud_walkingpad from './yagud/walkingpad'

const index = [
  // Original treadmills
  urevo_cyberpad,
  urevo_strol2spro,
  egofit_m2,
  
  // New treadmills from OPML conversion
  urevo_3s,
  urevo_2slite,
  urevo_e5,
  urevo_e4,
  urevo_e3,
  deerrun_q1mini,
  egofit_m1pro,
  goyouth_2in1,
  goplus,
  walkingpad_z1,
  // lifespan_tr1000,
  lifespan_tr1200,
  lifespan_tr5000,
  imovr,
  sperax_motioneaselitep1,
  bifanuo_tm008,
  yagud_walkingpad,
]
export default index

export const dataObj = Object.fromEntries(
  index.map(product => ([
    product.key,
    product
  ]))
)