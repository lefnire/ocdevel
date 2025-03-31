import React from "react";
import {Button, Container} from "react-bootstrap";
import './route.css'
import {contentSections} from './content-section'
import {dataObj} from './treadmills/data/index'
import essentials, {type AffiliateLink} from '~/content/product-links'

import {VideoButton} from './utils'
import {getCurrentLink, getPrice} from "./treadmills/utils";
import {type ListenerProps} from "~/routes/walk/url-listener";
import type {Product} from "~/routes/walk/treadmills/rows";

// import img_urevo_3s from '~/assets/products/urevo_3s.jpg?w=100&h=100&format=webp&effort=6'
// import img_urevo_cyberpad from '~/assets/products/urevo_cyberpad.jpg?w=100&h=100&format=webp&effort=6'
// import img_deerrun_q1mini from '~/assets/products/deerrun_q1mini.jpg?w=100&h=100&format=webp&effort=6'
// import img_urevo_3s from '~/assets/products/urevo_3s.jpg?w=100&h=100&format=avif&effort=max'
import img_urevo_cyberpad from '~/assets/products/urevo_cyberpad.jpg?w=100&h=100&format=avif&effort=max'
import img_deerrun_q1mini from '~/assets/products/deerrun_q1mini.jpg?w=100&h=100&format=avif&effort=max'
import img_lifespan_tx6 from '~/assets/products/lifespan_tx6.jpg?w=100&h=100&format=avif&effort=max'
import { Image } from "@unpic/react";
import {Link, useNavigate} from "react-router";
import {FaArrowLeft} from "react-icons/fa";

type AffiliateLink_ = AffiliateLink & {linkText: string}
const treadmills: AffiliateLink_[] = [
    {
      key: dataObj.lifespan_tx6.key,
      image: img_lifespan_tx6,
      title: 'Premium: LifeSpan TX6',
      notes: () => <div>
        <span>Buy it for life. Invincible, quiet, fast.</span>
        {/*<VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />*/}
      </div>,
      link: getCurrentLink(dataObj.lifespan_tx6),
      linkText: `$${getPrice(dataObj.lifespan_tx6)} on Amazon`,
      price: getPrice(dataObj.lifespan_tx6),
    },
    {
      key: dataObj.urevo_cyberpad.key,
      image: img_urevo_cyberpad,
      title: 'Value: Urevo CyberPad',
      notes: () => <div>
        <span>Sturdy, quiet, feature-rich.</span>
        <VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />
      </div>,
      link: getCurrentLink(dataObj.urevo_cyberpad),
      linkText: `$${getPrice(dataObj.urevo_cyberpad)} on Amazon`,
      price: getPrice(dataObj.urevo_cyberpad),
    },
    // {
    //   key: dataObj.urevo_3s.key,
    //   image: img_urevo_3s,
    //   title: 'Value: 3S',
    //   notes: () => <div>
    //     <span>One size fits all, bang for buck.</span>
    //     <VideoButton href="https://www.youtube.com/shorts/NRxkNG9Y3VU" />
    //   </div>,
    //   link: getCurrentLink(dataObj.urevo_3s),
    //   linkText: `$${getPrice(dataObj.urevo_3s)} on Amazon`,
    //   price: getPrice(dataObj.urevo_3s),
    // },
    {
      key: dataObj.deerrun_q1mini.key,
      image: img_deerrun_q1mini,
      title: 'Budget: DeerRun Q1',
      notes: () => <div>
        <span>Test the waters. No incline, 1-2yrs life.</span>
        <VideoButton href="https://www.youtube.com/shorts/PWtwSiv2VzI" />
      </div>,
      link: getCurrentLink(dataObj.deerrun_q1mini),
      linkText: `$${getPrice(dataObj.deerrun_q1mini)} on Amazon`,
      price: getPrice(dataObj.deerrun_q1mini),
    },
]

const otherProducts: AffiliateLink_[] = [
  {
    ...essentials.flexispot_en1,
    linkText: `$${essentials.flexispot_en1.price} on Amazon`,
  },
  {
    ...essentials.urevo_mat,
    linkText: `$${essentials.urevo_mat.price} on Amazon`,
  },
  {
    ...essentials.godora_lube,
    linkText: `$${essentials.godora_lube.price} on Amazon`,
  },
  // {
  //   image: '/walk_thumbs/fluidstance.jpg',
  //   title: 'Board: FluidStance',
  //   description: 'Cushioned balance board for non-walking times.',
  //   link: walkingDeskLinks["key://fluidstance"],
  //   linkText: 'View on FluidStance'
  // }
];

interface Products {
  title: string
  links: Array<keyof typeof contentSections>
  products: AffiliateLink_[]
}
export function ProductsCard ({ title, links, products }: Products) {
  function renderNotes(d: any) {
      if (!d) { return null; }
      if (typeof d === "string") { return d; }
      return d();
    }
  function renderProduct(product: AffiliateLink_) {
    return <div className="mb-4" key={product.key}>
      <div className="d-flex">
        <div className="me-3">
          <Image
            src={product.image}
            width={100}
            height={100}

            loading="eager"
            fetchPriority="high"
            decoding="async"
            // priority="true"

            background="#808080"
            layout="constrained"
            // className="product-thumbnail"
            alt={product.title}
          />
        </div>
        <div className="d-flex flex-column">
          <h6 className="mb-1">{product.title}</h6>
          <small className="text-body-secondary mb-2">{renderNotes(product.notes)}</small>
          <a
            href={product.link}
            rel="noopener noreferrer"
            target="_blank"
            className={`btn btn-primary align-self-start plausible-event-name=affiliate plausible-event-product=${product.key}`}
          >
            <span>{product.linkText || 'View on Amazon'}</span>
          </a>
        </div>
      </div>
    </div>
  }

  return <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map(renderProduct)}
    </div>
    <div className="card-body">
      {links.map(l => (
        <Link key={l} to={`#${l}`} className="card-link">{contentSections[l]}</Link>
      ))}
    </div>
  </div>
}

// function Overview() {
//   const setTab = tabStore(s => s.setTab)
//   return <div className="text-center">
//     <Button variant="link" onClick={() => setTab("buying_guide")}>How to use this table.</Button>
//     <VideoButton href="https://www.youtube.com/watch?v=_6EiAK-jmYQ" label="Overview"/>
//   </div>
// }

export default function TopSection(props: ListenerProps) {
  if (props.isCompareMode || props.isFiltered) {
    return <ReducedTop {...props} />
  }

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
    {/*<Overview />*/}
  </Container>
}

function ReducedTop({isCompareMode, isFiltered, filteredData}: ListenerProps) {
  const navigate = useNavigate()
  const handleShowAll = () => {
    navigate('/walk')
    // searchParams.delete('compare');
    // setSearchParams(searchParams);
  };

  function renderContent() {
    if (isFiltered) {
      return <div>Showing filtered data. This page contains affiliate links</div>
    }
    const label = filteredData.map((row: Product) => {
      return `${row.brand.name} ${row.model.value}`
    }).join(' vs ')
    return <>
      <h3 className='my-0'>{label} (Compared)</h3>
      <div>This page contains affiliate links</div>
    </>
  }

  return <Container className='d-flex flex-column align-items-center gap-2 mb-2 my-2'>
    {renderContent()}
    <Button
      size="sm"
      variant="outline-secondary"
      onClick={handleShowAll}
    >
      <FaArrowLeft /> Show All
    </Button>
  </Container>
}