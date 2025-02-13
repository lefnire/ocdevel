import wf from '../../workflowy/walking-desk.opml'
import {BattleStation} from "../utils.tsx";
import {walkingDeskLinks} from '../../workflowy/walking-desk-links'
import {Workflowy} from '../../../components/utils/Workflowy.tsx'
import { ProductCard } from './ProductCard'
import { VideoEmbed } from './VideoEmbed'

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
    link: walkingDeskLinks["key://cyberpad"]
  },
  {
    image: '/walk_thumbs/3s.jpg',
    title: 'Value: 3S',
    description: 'One size fits all, bang for buck. Set incline=3, speed=2.',
    link: walkingDeskLinks["key://urevo_3s"]
  },
  {
    image: '/walk_thumbs/deerrun.jpg',
    title: 'Budget: DeerRun',
    description: 'Test the waters. No incline, 1-2yrs life; but good price.',
    link: walkingDeskLinks["key://deerrun"]
  },
];

const otherProducts = [
  {
    image: '/walk_thumbs/desk.jpg',
    title: 'Desk: FlexiSpot',
    description: 'Electric sit/stand',
    link: walkingDeskLinks["key://flexispot"]
  },
  {
    image: '/walk_thumbs/mat.jpg',
    title: 'Mat: Urevo',
    description: 'Prevents floor damage, protects knees',
    link: walkingDeskLinks["key://mat"]
  },
  {
    image: '/walk_thumbs/lube.jpg',
    title: 'Lube: Godora',
    description: 'Silicone treadmill lubricant. Apply every 50hrs',
    link: walkingDeskLinks["key://lube"]
  }
  // {
  //   image: '/walk_thumbs/fluidstance.jpg',
  //   title: 'Board: FluidStance',
  //   description: 'Cushioned balance board for non-walking times.',
  //   link: walkingDeskLinks["key://fluidstance"],
  //   linkText: 'View on FluidStance'
  // }
];

const videos = [
  { id: 'rLDXoTD525E', title: 'Basics' },
  { id: 'fHjxqYBIPKA', title: 'Intermediate' },
  { id: 'BLvJmlB3j7Q', title: 'Advanced' }
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
    @media (min-width: 768px) {
      .product-thumbnail {
        width: 100px;
        height: 100px;
      }
    }
  `}</style>

  <p>My picks change with research and testing. Scroll past the videos for research and different budgets.</p>

  <div className="row g-4 mb-4">
    <div className="col-12 col-md-6">
      <ProductCard title="Treadmill" products={treadmillProducts} />
    </div>
    <div className="col-12 col-md-6">
      <ProductCard title="Other" products={otherProducts} />
    </div>
  </div>

  <div className="row g-3 mb-4">
    {videos.map((video, i) => (
      <div className="col-12 col-md-4" key={i}>
        <VideoEmbed videoId={video.id} title={video.title} />
      </div>
    ))}
  </div>

  <small>Outdated, but more detailed, <a href="https://youtube.com/embed/rLDXoTD525E?si=xk2XnhXVhVpIkHnT" target="_blank">video here</a>.</small>

  <Workflowy wf={wf} />
  <hr/>
  <BattleStation />
</div>

export default body;