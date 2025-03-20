import wf from '~/content/workflowy/walking-desk.opml'
import {BattleStation} from "~/components/utils.tsx";
import {walkingDeskLinks} from '~/content/workflowy/walking-desk-links'
import {Workflowy} from '~/components/workflowy.tsx'
import { ProductCard } from './product-card'
import {useCallback, useEffect, useMemo, useState} from "react";

export * from './meta.js'

const treadmillProducts = {
  CA: [
    {
      key: 'mobvoi',
      image: '/walk_thumbs/mobvoi_ca.png',
      title: 'Value: Mobvoi Fitness 10',
      description: 'Bang for buck. Incline, walk & run modes',
      link: "https://amzn.to/4hmAP5C",
      linkText: "~$340 on Amazon",
      price: 340,
    },
    {
      key: 'deerrun',
      image: '/walk_thumbs/deerrun.jpg',
      title: 'Budget: DeerRun',
      description: 'Test the waters. No incline, 1-2yrs life; but good price.',
      // link: walkingDeskLinks["key://deerrun"],
      link: "https://amzn.to/4kHdtdM",
      linkText: "~$250 on Amazon",
      price: 250,
    },
  ],
  US: [
    {
      key: 'cyberpad',
      image: '/walk_thumbs/cyberpad.jpg',
      title: 'Premium: CyberPad',
      description: 'Sturdiest, quietest, most features. Set incline=3, speed=2.',
      link: walkingDeskLinks["key://cyberpad"],
      linkText: "~$500 on Amazon",
      price: 500,
    },
    {
      key: 'urevo_3s',
      image: '/walk_thumbs/3s.jpg',
      title: 'Value: 3S',
      description: 'One size fits all, bang for buck. Set incline=3, speed=2.',
      link: walkingDeskLinks["key://urevo_3s"],
      linkText: "~$350 on Amazon",
      price: 350,
    },
    {
      key: 'deerrun',
      image: '/walk_thumbs/deerrun.jpg',
      title: 'Budget: DeerRun',
      description: 'Test the waters. No incline, 1-2yrs life; but good price.',
      link: walkingDeskLinks["key://deerrun"],
      linkText: "~$150 on Amazon",
      price: 150,
    },
  ]
};

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


export default function Body() {
  const [loc, setLoc] = useState();
  const [treadmills, setTreadmills] = useState(treadmillProducts.US);
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        // data.country_code = 'CA'
        if (data.country_code === "CA") {
          setTreadmills(treadmillProducts.CA);
        }
        // else if (data.country === "GB") {
        //   amazonLink = "https://www.amazon.co.uk/your-affiliate-link";
        // // } else if (["DE", "FR", "IT", "ES", "NL"].includes(data.country)) {
        // } else if (data.continent_code === "EU") {
        //   amazonLink = "https://www.amazon.eu/your-affiliate-link";
        // } else {
        //   amazonLink = "https://www.amazon.com/your-affiliate-link";
        // }
        // Update your page accordingly, e.g.:
        // document.getElementById('amazonLink').href = amazonLink;
      })
      // .catch(error => {
      //   debugger
      //   console.error('Error fetching location data:', error);
      //   // Fallback to USA link
      //   document.getElementById('amazonLink').href = "https://www.amazon.com/your-affiliate-link";
      // });
  }, [])
  return <div>
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
        <ProductCard title="Treadmill" products={treadmills} />
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
}