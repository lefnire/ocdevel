import React from "react";
import {clickAffiliate} from '~/components/analytics'
import {Button, Container} from "react-bootstrap";
import './route.css'
import Tabs, {tabStore, type TabKey, tabs} from './tabs'
import {dataObj} from './treadmills/data/index'

import essentials from './essentials-links'
import {VideoButton} from './utils'
import {getCurrentLink, getPrice} from "~/routes/walk/treadmills/data/utils";

const treadmills = [
    {
      key: 'cyberpad',
      image: '/walk_thumbs/cyberpad.jpg',
      title: 'Premium: CyberPad',
      description: <div>
        <span>Sturdiest, quietest, most features.</span>
        <VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />
      </div>,
      link: getCurrentLink(dataObj.urevo_cyberpad),
      linkText: `~$${getPrice(dataObj.urevo_cyberpad)} on Amazon`,
      price: getPrice(dataObj.urevo_cyberpad),
    },
    {
      key: 'urevo_3s',
      image: '/walk_thumbs/3s.jpg',
      title: 'Value: 3S',
      description: <div>
        <span>One size fits all, bang for buck.</span>
        <VideoButton href="https://www.youtube.com/shorts/NRxkNG9Y3VU" />
      </div>,
      link: getCurrentLink(dataObj.urevo_3s),
      linkText: `~$${getPrice(dataObj.urevo_3s)} on Amazon`,
      price: getPrice(dataObj.urevo_3s),
    },
    {
      key: 'deerrun',
      image: '/walk_thumbs/deerrun.jpg',
      title: 'Budget: DeerRun',
      description: <div>
        <span>Test the waters. No incline, 1-2yrs life; great price.</span>
        <VideoButton href="https://www.youtube.com/shorts/PWtwSiv2VzI" />
      </div>,
      link: getCurrentLink(dataObj.deerrun_q1mini),
      linkText: `~$${getPrice(dataObj.deerrun_q1mini)} on Amazon`,
      price: getPrice(dataObj.deerrun_q1mini),
    },
]

const otherProducts = [
  {
    key: 'flexispot',
    image: '/walk_thumbs/desk.jpg',
    title: 'Desk: FlexiSpot',
    description: 'Electric sit/stand',
    link: essentials.flexispot,
    linkText: "~$150 on Amazon",
    price: 150,
  },
  {
    key: 'mat',
    image: '/walk_thumbs/mat.jpg',
    title: 'Mat: Urevo',
    description: 'Prevents floor damage, protects knees',
    link: essentials.mat,
    linkText: "$40 on Amazon",
    price: 40,
  },
  {
    key: 'lube_godora',
    image: '/walk_thumbs/lube.jpg',
    title: 'Lube: Godora',
    description: <div>
      <span>Silicone treadmill lubricant. Apply every 50hrs</span>
      <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
    </div>,
    link: essentials.lube,
    linkText: "$35 on Amazon",
    price: 35,
  }
  // {
  //   image: '/walk_thumbs/fluidstance.jpg',
  //   title: 'Board: FluidStance',
  //   description: 'Cushioned balance board for non-walking times.',
  //   link: walkingDeskLinks["key://fluidstance"],
  //   linkText: 'View on FluidStance'
  // }
];



interface Product {
  image: string;
  title: string;
  description: string | React.ReactElement;
  link: string;
  linkText?: string;
  key: string;
  price: number;
}

interface Products {
  title: string
  links: TabKey[]
  products: Product[]
}
export function ProductsCard ({ title, links, products }: Products) {
  function renderProduct(product: Product) {
    return <div className="mb-4" key={product.key}>
      <div className="d-flex">
        <div className="me-3">
          <img src={product.image} className="product-thumbnail" alt={product.title} />
        </div>
        <div className="d-flex flex-column">
          <h6 className="mb-1">{product.title}</h6>
          <small className="text-body-secondary mb-2">{product.description}</small>
          <a
            href={product.link}
            onClick={clickAffiliate({label: product.key, value: product.price })}
            target="_blank"
            className="btn btn-primary align-self-start"
          >
            <span>{product.linkText || 'View on Amazon'}</span>
          </a>
        </div>
      </div>
    </div>
  }

  const setTab = tabStore(s => s.setTab);
  return <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map(renderProduct)}
    </div>
    <div className="card-body">
      {links.map(l => (
        <a key={l} onClick={() => setTab(l)} className="card-link">{tabs[l]}</a>
      ))}
    </div>
  </div>
}

function Overview() {
  const setTab = tabStore(s => s.setTab)
  return <div className="text-center">
    <Button variant="link" onClick={() => setTab("buying_guide")}>How to use this table.</Button>
    <VideoButton href="https://www.youtube.com/watch?v=_6EiAK-jmYQ" label="Overview"/>
  </div>
}

export default function TopSection() {
  // TODO replace ./route.css with image loaders for remix
  return <Container className='mt-0'>
    <div className="text-center my-1">This page contains affiliate links</div>
    <div className="row g-4 mb-4">
    <div className="col-12 col-md-6">
        <ProductsCard
          title="Best Walking Pads in 2025"
          products={treadmills}
          links={["why_desk", "buying_guide"]}
        />
      </div>
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Essentials"
          products={otherProducts}
          links={["care", "essentials"]}
        />
      </div>
    </div>
    <Tabs />
    {/*<Overview />*/}
  </Container>
}
