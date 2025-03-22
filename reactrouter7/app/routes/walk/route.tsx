import Table from './treadmills/table'
import TopSection from "./top-section";

export default function Route() {
  return <div>
    <TopSection />
    <Table />
  </div>
}

export function meta() {
  return [
    { title: "Best Walking Pads 2025" },
    // TODO optimize per https://trends.google.com/trends/explore?date=today%203-m&geo=US&q=walking%20pad,treadmill%20desk,walking%20desk&hl=en-GB
    { name: "description", content: "Best under desk walking pads for treadmill desks. Urevo, Egofit, LifeSpan, Sperax, CitySports, Yagud, Ancheer, KingSmith, DeerRun, and more." }
  ]
}