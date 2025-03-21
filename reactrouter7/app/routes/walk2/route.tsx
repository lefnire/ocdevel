import {Container, Col, Row} from 'react-bootstrap'
import Table from './treadmills/table'
import {ProductsCard} from "./product-card";
import {walkingDeskLinks} from "~/content/workflowy/walking-desk-links";
import {FaYoutube} from "react-icons/fa";

// TOOD locale
const treadmills = [
    {
      key: 'cyberpad',
      image: '/walk_thumbs/cyberpad.jpg',
      title: 'Premium: CyberPad',
      description: <div>
        <span>Sturdiest, quietest, most features.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://cyberpad"],
      linkText: "~$500 on Amazon",
      price: 500,
    },
    {
      key: 'urevo_3s',
      image: '/walk_thumbs/3s.jpg',
      title: 'Value: 3S',
      description: <div>
        <span>One size fits all, bang for buck.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://urevo_3s"],
      linkText: "~$350 on Amazon",
      price: 350,
    },
    {
      key: 'deerrun',
      image: '/walk_thumbs/deerrun.jpg',
      title: 'Budget: DeerRun',
      description: <div>
        <span>Test the waters. No incline, 1-2yrs life; but good price.</span>
        <a href="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl"><FaYoutube /> Video</a>
      </div>,
      link: walkingDeskLinks["key://deerrun"],
      linkText: "~$150 on Amazon",
      price: 150,
    },
]

const otherProducts = [
  {
    key: 'flexispot',
    image: '/walk_thumbs/desk.jpg',
    title: 'Desk: FlexiSpot',
    description: 'Electric sit/stand',
    link: walkingDeskLinks["key://flexispot"],
    linkText: "~$150 on Amazon",
    price: 150,
  },
  {
    key: 'mat',
    image: '/walk_thumbs/mat.jpg',
    title: 'Mat: Urevo',
    description: 'Prevents floor damage, protects knees',
    link: walkingDeskLinks["key://mat"],
    linkText: "$40 on Amazon",
    price: 40,
  },
  {
    key: 'lube_godora',
    image: '/walk_thumbs/lube.jpg',
    title: 'Lube: Godora',
    description: 'Silicone treadmill lubricant. Apply every 50hrs',
    link: walkingDeskLinks["key://lube"],
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

export default function Route() {
  return <div>
    <Container fluid>
      <style jsx>{`
      .thumbnail-placeholder {
        background-color: #e0e0e0;
        width: 50px;
        height: 50px;
      }
      .product-thumbnail {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .video-wrapper {
        position: relative;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding-bottom: 56.25%;
      }
      @media (min-width: 768px) {
        .product-thumbnail {
          width: 100px;
          height: 100px;
        }
      }
    `}</style>

    <div className="row g-4 mb-4">
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Walking Pads"
          products={treadmills}
          links={[
            <a href="#">Why walking desks?</a>
          ]}
        />
      </div>
      <div className="col-12 col-md-6">
        <ProductsCard
          title="Essentials"
          products={otherProducts}
        />
      </div>
    </div>

    </Container>
    <Table />
    <Container fluid>
      <div>Bottom section</div>
    </Container>
  </div>
}

export function meta() {
  return [
    { title: "Best Walking Pads 2025" },
    // TODO optimize per https://trends.google.com/trends/explore?date=today%203-m&geo=US&q=walking%20pad,treadmill%20desk,walking%20desk&hl=en-GB
    { name: "description", content: "Best under desk walking pads for treadmill desks. Urevo, Egofit, LifeSpan, Cintra, CitySports, Maksone, Yagud, Ancheer, Kingsmith, DeerRun, and more." }
  ]
}