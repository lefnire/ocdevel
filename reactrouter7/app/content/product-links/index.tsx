import {type PropsWithChildren, type ReactElement} from 'react'

// TODO consolidate this with Product
export interface AffiliateLink {
    title?: string
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
        className={`plausible-event-name=affiliate plausible-event-product=${product.key}`}
        rel="noopener noreferrer"
    >{label || product.title}</a>
}
// FIXME combine with affiliateLink above (change all the mdx files)
// FIXME move the image imports somwhere else, so they're not included in keyboards/mice
export function Affiliate({product, children, ...props}: PropsWithChildren<{
    product: AffiliateLink,
    className?: string
}>) {
    const {className, ...rest} = props
    const classes = [
      "plausible-event-name=affiliate",
      `plausible-event-product=${product.key}`,
      (className || "")
    ].join(' ')
    return <a
      href={product.link}
      target="_blank"
      className={classes}
      rel="noopener noreferrer"
      {...rest}
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
      price: 40
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
        link: "https://amzn.to/4au1fk1",
        key: "shoes_men",
    },
    shoes_women: {
        link: "https://amzn.to/3WvoJiM",
        key: "shoes_women",
    },
    fluidstance_planecloud: {
        link: "https://shareasale.com/r.cfm?b=1147740&u=4069700&m=74356&urllink=&afftrack=",
        key: "fluidstance_planecloud"
    },
    kensington_slimbladepro: {
        link: "https://amzn.to/3tIE30e",
        key: "kensington_slimbladepro",
    },
    keychron_q11: {
        link: "https://amzn.to/49INDPN",
        key: "keychron_q11",
    },
    mistel_md770: {
        link: "https://amzn.to/3RqQJ47",
        key: "mistel_md770",
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
        link: "https://amzn.to/48LYA2N",
        key: "elecom_huge",
    },
    elecom_deftpro: {
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
    }
}
export default links;