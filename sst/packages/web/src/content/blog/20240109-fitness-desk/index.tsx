import wf from '../../workflowy/walking-desk.opml'
import {BattleStation} from "../utils.tsx";
import {walkingDeskLinks} from '../../workflowy/walking-desk-links'
import {Workflowy} from '../../../components/utils/Workflowy.tsx'
import { ProductCard } from './ProductCard'

export const id = '20240109-fitness-desk'
export const date = '2024-01-09'
export const updated = '2025-01-25'
export const title = "Walking Desk"
export const pinned = true
export const affiliate = true
export const teaser = "Comparison of treadmill desk options. Under-desk walking pads: Egofit, Urevo, GoYouth, GoPlus, WalkingPad, Lifespan, iMovR. A video showing how and when to use each option. Links to stand/sit desks, monitor arms, and ergonomic peripherals."
export const jsx = true;

const treadmillProducts = [
  {
    image: '/walk_thumbs/cyberpad.jpg',
    title: 'Premium: CyberPad',
    description: 'Sturdiest, quietest, most features. Set incline=3, speed=2.',
    link: walkingDeskLinks["key://cyberpad"],
    linkText: "~$500 on Amazon"
  },
  {
    image: '/walk_thumbs/3s.jpg',
    title: 'Value: 3S',
    description: 'One size fits all, bang for buck. Set incline=3, speed=2.',
    link: walkingDeskLinks["key://urevo_3s"],
    linkText: "~$350 on Amazon"
  },
  {
    image: '/walk_thumbs/deerrun.jpg',
    title: 'Budget: DeerRun',
    description: 'Test the waters. No incline, 1-2yrs life; but good price.',
    link: walkingDeskLinks["key://deerrun"],
    linkText: "~$150 on Amazon"
  },
];

const otherProducts = [
  {
    image: '/walk_thumbs/desk.jpg',
    title: 'Desk: FlexiSpot',
    description: 'Electric sit/stand',
    link: walkingDeskLinks["key://flexispot"],
    linkText: "~$150 on Amazon"
  },
  {
    image: '/walk_thumbs/mat.jpg',
    title: 'Mat: Urevo',
    description: 'Prevents floor damage, protects knees',
    link: walkingDeskLinks["key://mat"],
    linkText: "$40 on Amazon"
  },
  {
    image: '/walk_thumbs/lube.jpg',
    title: 'Lube: Godora',
    description: 'Silicone treadmill lubricant. Apply every 50hrs',
    link: walkingDeskLinks["key://lube"],
    linkText: "$35 on Amazon"
  }
  // {
  //   image: '/walk_thumbs/fluidstance.jpg',
  //   title: 'Board: FluidStance',
  //   description: 'Cushioned balance board for non-walking times.',
  //   link: walkingDeskLinks["key://fluidstance"],
  //   linkText: 'View on FluidStance'
  // }
];

const body = <div>
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
    .video-wrapper iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    @media (min-width: 768px) {
      .product-thumbnail {
        width: 100px;
        height: 100px;
      }
    }
  `}</style>

  <p>My picks change with research and testing. Watch the video below for a complete overview, then scroll down for research, different budgets and options, and more tips.</p>

  <div className="row g-4 mb-4">
    <div className="col-12 col-md-6">
      <ProductCard title="Treadmill" products={treadmillProducts} />
    </div>
    <div className="col-12 col-md-6">
      <ProductCard title="Other" products={otherProducts} />
    </div>
  </div>

  <div className="mb-4">
    <div className="video-wrapper">
      <iframe 
        src="https://www.youtube.com/embed/ZLHQSqGWFhU?si=Z_scXPhoMVWQLFFl" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      />
    </div>
  </div>

  <Workflowy wf={wf} />
  <hr/>
  <BattleStation />
</div>

export default body;