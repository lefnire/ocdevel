import Table from './treadmills/table'
import TopSection from "./top-section";
import BottomSection from './bottom-section';
import {useCompare} from "~/routes/walk/treadmills/compare";
import {seoLabels} from "~/routes/walk/treadmills/data";

export default function Route() {
  const compareProps = useCompare()
  return <div>
    <TopSection {...compareProps} />
    <Table {...compareProps} />
    <BottomSection {...compareProps} />
  </div>
}

export function meta() {
  const brands = seoLabels.slice(0, 20).join(', ')
  return [
    { title: "Best Walking Pads 2025" },
    { name: "description", content: `Best under desk walking pads for treadmill desks in 2025. ${brands}, and more.` },
  ]
}

export function links() {
  return [
    // for the /blog/20240109-fitness-desk inbound links
    {
      rel: "canonical",
      href: "https://ocdevel.com/walk",
    },
  ];
}