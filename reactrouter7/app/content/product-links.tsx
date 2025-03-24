import React, {type ReactElement} from 'react'
import {VideoButton} from "~/routes/walk/utils";
import {clickAffiliate} from "~/components/analytics";

// TODO consolidate this with Product
export interface AffiliateLink {
    title?: string
    image?: string
    link: string
    key: string
    notes?: string | (() => ReactElement)
    price?: number
}

export function affiliateLink(product: AffiliateLink, label: string) {
    const onClick = clickAffiliate({label: product.key, value: product.price});
    return <a
        href={product.link}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
    >{label}</a>
}

const links: Record<string, AffiliateLink> = {
    urevo_mat: {
        key: "urevo_mat",
        title: "Mat: Urevo",
        image: '/walk_thumbs/mat.jpg',
        link: "https://amzn.to/3WrW0v5",
        notes: 'Prevents floor damage, protects knees',
        price: 40
    },
    godora_lube: {
        key: "godora_lube",
        image: '/walk_thumbs/lube.jpg',
        title: 'Lube: Godora',
        notes: () => <div>
          <span>Silicone treadmill lubricant. Apply every 50hrs</span>
          <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
        </div>,
        price: 35,
        link: "https://amzn.to/3E7YUPw"
    },
    flexispot_en1: {
        link: "https://amzn.to/40Kddmd",
        key: 'flexispot_en1',
        image: '/walk_thumbs/desk.jpg',
        title: 'Desk: FlexiSpot',
        notes: 'Electric sit/stand',
        price: 150,
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
        link: "https://amzn.to/3U0tBue",
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
        link: "https://www.bhphotovideo.com/c/product/1811267-REG/lenovo_83de0008us_16_legion_pro_7.html",
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