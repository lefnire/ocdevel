import Table from './treadmills/table'
import TopSection from "./top-section";
import BottomSection from './bottom-section';
import {SearchListener} from "./treadmills/store";

export default function Route() {
  return <div>
    <SearchListener />
    <TopSection />
    <Table />
    <BottomSection />
  </div>
}

export function meta() {
  return [
    { title: "Best Walking Pads 2025" },
    // TODO optimize per https://trends.google.com/trends/explore?date=today%203-m&geo=US&q=walking%20pad,treadmill%20desk,walking%20desk&hl=en-GB
    { name: "description", content: "Best under desk walking pads for treadmill desks. Urevo, Egofit, LifeSpan, Sperax, CitySports, Yagud, Ancheer, KingSmith, DeerRun, and more." },
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