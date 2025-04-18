import {type PropsWithChildren, type ReactElement} from 'react'
import {expires} from "~/components/date-utils";
import {clickAffiliate} from "~/components/analytics";

// TODO consolidate this with Product
export interface AffiliateLink {
  title: string
  image?: string
  link: string
  key: string
  notes?: string | (() => ReactElement)
  price?: number
}

export function affiliateLink(product: AffiliateLink, label?: string) {
  return <a
    href={product.link}
    target="_blank"
    onClick={clickAffiliate(product.key)}
    rel="noopener noreferrer"
  >{label || product.title}</a>
}

// FIXME combine with affiliateLink above (change all the mdx files)
// FIXME move the image imports somwhere else, so they're not included in keyboards/mice
export function Affiliate({product, children, className="", ...props}: PropsWithChildren<{
  product: AffiliateLink,
  className?: string
}>) {
  return <a
    onClick={clickAffiliate(product.key)}
    href={product.link}
    target="_blank"
    className={className || ""}
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
}

const links: Record<string, AffiliateLink> = {
  urevo_mat: {
    key: "urevo_mat",
    title: "Urevo Mat",
    link: "https://amzn.to/3WrW0v5",
    notes: 'Prevents floor damage, protects knees',
    price: 36
  },
  sunny_mat: {
    key: "sunny_mat",
    title: "Sunny Mat",
    link: "https://amzn.to/3DUsBnC",
    notes: 'Prevents floor damage, protects knees',
    price: 25,
  },
  flexispot_en1: {
    link: "https://amzn.to/40Kddmd",
    key: 'flexispot_en1',
    title: 'FlexiSpot EN1',
    price: 150,
  },
  godora_lube: {
    key: "godora_lube",
    title: 'Godora Lube',
    link: "https://amzn.to/3E7YUPw",
    price: 35,
  },
  sekoday_lube: {
    key: "sekoday_lube",
    title: "Sekoday Lube",
    price: 8,
    link: "https://amzn.to/4hHO151",
  },
  shoes_men: {
    title: "Hoka Bondi 9",
    link: "https://amzn.to/42l9TgU",
    key: "shoes_men",
  },
  shoes_women: {
    title: "Hoka Bondi 9",
    link: "https://amzn.to/3RaRuOQ",
    key: "shoes_women",
  },
  fluidstance_planecloud: {
    link: "https://shareasale.com/r.cfm?b=1147740&u=4069700&m=74356&urllink=&afftrack=",
    key: "fluidstance_planecloud"
  },
  kensington_slimbladepro: {
    title: "SlimBlade Pro",
    link: "https://amzn.to/3tIE30e",
    key: "kensington_slimbladepro",
  },
  keychron_q11: {
    title: "Keychron Q11",
    link: "https://amzn.to/49INDPN",
    key: "keychron_q11",
  },
  mistel_md770: {
    title: "Mistel Barocco MD770",
    link: "https://amzn.to/3RqQJ47",
    key: "mistel_md770",
  },
  epomaker_split65: {
    title: "Epomaker Split65",
    key: "epomaker_split65",
    link: expires(
      "https://www.amazon.com/dp/B0DP48WWGB?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.SFBNR2KJWCWV&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.SFBNR2KJWCWV_1744380170535",
      "2026-01-01",
      "https://amzn.to/3XUul6Y"
    )
  },
  esdwristband: {
    link: "https://amzn.to/3Uz0XSA",
    key: "esdwristband"
  },
  vivo: {
    link: "https://amzn.to/3xCuL7C",
    key: "vivo"
  },
  mountup: {
    link: "https://amzn.to/3xL35O9",
    key: "mountup"
  },
  fingerlessgloves: {
    link: "https://amzn.to/48oewbX",
    key: "fingerlessgloves"
  },
  wristweights: {
    link: "https://amzn.to/4guIAGd",
    key: "wristweights"
  },
  lenovo_legion: {
    link: "https://www.lenovo.com/us/en/c/laptops/legion-laptops/legion-pro-series",
    key: "lenovo_legion",
  },
  lenovo_legionpro: {
    link: "https://amzn.to/4iH8Y1l",
    key: "lenovo_legionpro"
  },
  flydigi_bs1: {
    link: "https://amzn.to/40qoh6s",
    key: "flydigi_bs1"
  },
  logitech_mxmaster: {
    link: "https://amzn.to/3NZ24r3",
    key: "logitech_mxmaster"
  },
  logitech_lift: {
    link: "https://amzn.to/3HcIZxs",
    key: "logitech_lift",
  },
  logitech_mxvertical: {
    link: "https://amzn.to/3TOKjOO",
    key: "logitech_mxvertical",
  },
  mx_ergoplus: {
    link: "https://amzn.to/3Hcq3zd",
    key: "mx_ergoplus",
  },
  m575: {
    link: "https://amzn.to/3OlJjyf",
    key: "m575",
  },
  elecom_huge: {
    title: "Elecom Huge",
    link: "https://amzn.to/48LYA2N",
    key: "elecom_huge",
  },
  elecom_deftpro: {
    title: "Elecom Deft Pro",
    link: "https://amzn.to/3HgaiY4",
    key: "elecom_deftpro",
  },
  elecom_bitra: {
    link: "https://amzn.to/3SaKF0O",
    key: "elecom_bitra",
  },
  kensington_orbitfusion: {
    link: "https://amzn.to/3vu8jg7",
    key: "kensington_orbitfusion",
  },
  kensington_expert: {
    title: "Kensington Expert",
    link: "https://amzn.to/47uPExU",
    key: "kensington_expert",
  },
  slimblade: {
    link: "https://amzn.to/3RWvpDo",
    key: "slimblade",
  },
  logitech_k860: {
    link: "https://amzn.to/48QlVQS",
    key: "logitech_k860",
  },
  kensington_profit: {
    link: "https://amzn.to/3RW7tzZ",
    key: "kensington_profit",
  },
  microsoft_sculpt: {
    link: "https://amzn.to/3TXILSK",
    key: "microsoft_sculpt",
  },
  keyboard_kickstands: {
    link: "https://amzn.to/48pzVRX",
    key: "keyboard_kickstands",
  },
  svalboard: {
    title: "Svalboard",
    key: "svalboard",
    link: "https://svalboard.com/collections/frontpage"
  },
  ploopy_adept: {
    key: "ploopy_adept",
    title: "Ploopy Adept",
    link: "https://ploopy.co/shop/adept-trackball-fully-assembled/"
  },
  ploopy_classic2: {
    key: "ploopy_classic2",
    title: "Ploopy Classic 2",
    link: "https://ploopy.co/shop/classic-2-trackball-fully-assembled/"
  },
  nulea_m505: {
    title: "Nulea M505",
    key: "nulea_m505",
    link: expires(
      "https://www.amazon.com/dp/B0CF49TG15?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.1394WK3KWKGKO&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.1394WK3KWKGKO_1744149600303",
      "2025-05-16",
      "https://amzn.to/3XThemB"
    )
  },
  nulea_m512: {
    title: "Nulea M512",
    key: "nulea_m512",
    link: "https://amzn.to/42A0of4",
  },
  nulea_m509: {
    title: "Nulea M509",
    key: "nulea_m509",
    link: "https://amzn.to/4cIEcTL"
  },
  protoarc_em05: {
    title: "ProtoArc EM05",
    key: "protoarc_em05",
    link: expires(
      "https://www.amazon.com/dp/B0D7Q21GG8?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.2M4IV4T1VF9RY&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.2M4IV4T1VF9RY_1744152850048",
      "2025-06-03",
      "https://amzn.to/4i6fDkk"
    )
  },
  ploopy_thumb: {
    title: "Ploopy Thumb",
    key: "ploopy_thumb",
    link: "https://ploopy.co/shop/thumb-trackball-fully-assembled/"
  },
  gameball_thumb: {
    title: "GameBall Thumb",
    key: "gameball_thumb",
    link: "https://www.gamingtrackball.com/products/gameball-thumb-standard-edition"
  },
  wolfbox_air: {
    link: expires(
      "https://www.amazon.com/dp/B0DSW7R4VN?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.39GG535CJ7AYF&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.39GG535CJ7AYF_1744382419732",
      "2025-05-01",
      "https://amzn.to/3G3sxCy"
    ),
    title: "WolfBox MF50",
    key: "wolfbox_air",
  },
  euki_air: {
    link: expires(
      "https://www.amazon.com/dp/B0D5L9JL3P?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.3DZT5K7E2DBB4&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.3DZT5K7E2DBB4_1744385786428",
      "2025-06-01",
      "https://amzn.to/42tPqGX"
    ),
    title: "Euki Air Duster",
    key: "euki_air"
  },
  walkolution_walkolution2: {
    link: "https://walkolution.com/products/walkolution2?sca_ref=8416295.Hx5JVtdlxLpM&sca_source=blog",
    title: "Walkolution 2",
    key: "walkolution_walkolution2"
  },
  royalkludge_rks70: {
    key: "royalkludge_rks70",
    title: "Royal Kludge RKS70",
    link: expires(
      "https://www.amazon.com/dp/B0C88V7LQK?ref=t_ac_view_request_product_image&campaignId=amzn1.campaign.1XGTZSRTYMT05&linkCode=tr1&tag=ha0d2-20&linkId=amzn1.campaign.1XGTZSRTYMT05_1744985282195",
      "2025-06-01",
      "https://amzn.to/3EtFZ24"
    )
  }
}
export default links;