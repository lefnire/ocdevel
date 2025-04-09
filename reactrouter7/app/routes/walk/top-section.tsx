import Button from 'react-bootstrap/cjs/Button';
import Container from 'react-bootstrap/cjs/Container';
import './route.css'
import {contentSections} from './content-section'

import {ProductContext} from "~/routes/walk/context";
import type {CardOut, Product} from "~/content/treadmills/types";

import {Link} from "react-router";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";
import {useContext} from "react";
import picks from '~/content/treadmills/product-cards'


interface Products {
  title: string
  links: Array<keyof typeof contentSections>
  products: CardOut[]
}
export function ProductsCard ({ title, links, products }: Products) {
  function renderCard(card: CardOut) {
    return <div className="mb-4" key={card.key}>
      <div className="d-flex">
        <div className="me-3">
          <img
            src={card.image}
            width={100}
            height={100}

            loading="eager"
            fetchPriority="high"
            decoding="async"
            // priority="true"

            background="#808080"
            layout="constrained"
            // className="product-thumbnail"
            alt={card.cardTitle}
          />
        </div>
        <div className="d-flex flex-column">
          <h6 className="mb-1">{card.cardTitle}</h6>
          <small className="text-body-secondary mb-2">{card.notes}</small>
          <a
            href={card.link}
            rel="noopener noreferrer"
            target="_blank"
            className={`btn btn-primary align-self-start plausible-event-name=affiliate plausible-event-product=${card.key}`}
          >
            <span>{card.linkText || 'View on Amazon'}</span>
          </a>
        </div>
      </div>
    </div>
  }

  return <div className="card h-100">
    <div className="card-body">
      <h6 className="card-subtitle mb-2 text-body-secondary">{title}</h6>
      {products.map(renderCard)}
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

export default function TopSection() {
  const {isCompareMode, isFiltered} = useContext(ProductContext)
  if (isCompareMode || isFiltered) {
    return <ReducedTop />
  }

  // TODO replace ./route.css with image loaders for remix
  return <Container className='mt-0'>
    <div className="text-center my-1">This page contains affiliate links</div>
    <div className="row g-4 mb-4">
    <div className="col-12 col-md-6">
        <ProductsCard
          title="Best Walking Pads in 2025"
          products={[picks.premium, picks.value, picks.budget]}
          links={["why_desk", "buying_guide"]}
        />
      </div>
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Essentials"
          products={[picks.mat, picks.lube, picks.desk]}
          links={["care", "essentials"]}
        />
      </div>
    </div>
    {/*<Overview />*/}
  </Container>
}

function ReducedTop() {
  const {isFiltered, filteredData, handleShowAll} = useContext(ProductContext)

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