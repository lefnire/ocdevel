import {type AffiliateLink} from '../index'
import mat from './sunny_mat'
import lube from './godora_lube'
import desk from './flexispot_en1'
import premium from './lifespan_tx6'
import value from './urevo_cyberpad'
// import budget from './deerrun_q1mini'
import budget from './sperax_motioneaselitep1'

export type AffiliateLink_ = AffiliateLink & {linkText: string, topTitle?: string}
const picks: {[k: string]: AffiliateLink_} = {
  premium,
  value,
  budget,
  mat,
  lube,
  desk,
}
export default picks