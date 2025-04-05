import urevo_cyberpad from './urevo/cyberpad'
import urevo_strol2spro from './urevo/strol2spro'
import egofit_m2t from './egofit/m2t'
import egofit_m2 from './egofit/m2'
import urevo_3s from './urevo/3s'
import urevo_2slite from './urevo/2slite'
import urevo_e5 from './urevo/e5'
import urevo_e4 from './urevo/e4'
import urevo_e3 from './urevo/e3'
import deerrun_q1mini from './deerrun/q1mini'
import egofit_m1pro from './egofit/m1pro'
import goyouth_2in1 from './goyouth/2in1'
import goplus_walkingpad from './goplus/walkingpad'
import walkingpad_z1 from './walkingpad/z1'
import walkingpad_z3 from './walkingpad/z3'
import walkingpad_c2 from './walkingpad/c2'
// import lifespan_tr1000 from './lifespan/tr1000'
import lifespan_tr1200 from './lifespan/tr1200'
import lifespan_tr5000 from './lifespan/tr5000'
import lifespan_tx6 from './lifespan/tx6'
import imovr_unsit from './imovr/unsit'
import sperax_motioneaselitep1 from './sperax/motioneaselitep1'
import bifanuo_tm008 from './bifanuo/tm008'
import yagud_walkingpad from './yagud/walkingpad'
import lichico_dk38ab2 from './lichico/dk38ab2'
import elseluck_walkingpad from './elseluck/walkingpad'
import wellfit_wp017 from './wellfit/wp017'
import wellfit_wp021 from './wellfit/wp021'
import citysports_cswp8 from './citysports/cswp8'
import trailviber_walkingpad from './trailviber/walkingpad'
import superun_06mini from './superun/06mini'
import superun_06normal from './superun/06normal'
import lysole_walkingpad from './lysole/walkingpad'
import rythmfun_ap01 from './rythmfun/ap01'
import rythmfun_ap02 from './rythmfun/ap02'
import sunny_sft723007 from './sunny/sft723007'
import sunny_sft724064 from './sunny/sft724064'
import mobvoi_treadmillplus from './mobvoi/treadmillplus'
import walkolution_walkolution2 from './walkolution/walkolution2'

import {produce} from 'immer'

const index = [
  // Original treadmills
  urevo_cyberpad,
  urevo_strol2spro,
  egofit_m2,
  egofit_m2t,

  // New treadmills from OPML conversion
  urevo_3s,
  urevo_2slite,
  urevo_e5,
  urevo_e4,
  urevo_e3,
  deerrun_q1mini,
  egofit_m1pro,
  goyouth_2in1,
  goplus_walkingpad,
  walkingpad_z1,
  walkingpad_z3,
  walkingpad_c2,
  // lifespan_tr1000,
  lifespan_tr1200,
  lifespan_tr5000,
  lifespan_tx6,
  imovr_unsit,
  sperax_motioneaselitep1,
  bifanuo_tm008,
  yagud_walkingpad,
  lichico_dk38ab2,
  elseluck_walkingpad,
  wellfit_wp017,
  wellfit_wp021,
  citysports_cswp8,
  trailviber_walkingpad,
  superun_06mini,
  superun_06normal,
  lysole_walkingpad,
  rythmfun_ap01,
  rythmfun_ap02,
  sunny_sft723007,
  sunny_sft724064,
  mobvoi_treadmillplus,
  walkolution_walkolution2,
].map(produce(d => {
  // ensure defaults to prevent escape-hatches later
  d.brand.pickedBy = d.brand.pickedBy || {}
  d.dimensions = d.dimensions || {}
  d.links = d.links || {amazon: {}, brand: {}}
  d.weight = d.weight || {}
  d.maxWeight = d.maxWeight || {}
  d.maxSpeed = d.maxSpeed || {}
  d.horsePower = d.horsePower ||{ }
  d.age = d.age || {}
  d.rating = d.rating || {}
  d.price = d.price || {}
  d.pickedBy = d.pickedBy || {}
  d.incline = d.incline || {}
  d.shock = d.shock || {}
  d.decibels = d.decibels || {}
  d.app = d.app || {}
  d.easyLube = d.easyLube || {}
}))
export default index

export const UPDATED = "2025-03-28"

export const dataObj = Object.fromEntries(
  index.map(product => ([
    product.key,
    product
  ]))
)

// to save on RAM / reduce data duplication (because the data is hydrated,
// so it's no longer by reference),
export const dataKeys = index.map(product => product.key)