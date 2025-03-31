import Table from './table'
import TopSection from "./top-section";
import CompareButtons from './compare-buttons';
import {useCompare, useUrlFilters} from "~/routes/walk/url-listener";
import {seoLabels} from "~/content/treadmills/data";
import ContentSection from "~/routes/walk/content-section";
import CalorieCalc from "~/routes/walk/calorie-calc";
import React from "react";

export default function Route() {
  const compareProps = useCompare()
  const urlFilters = useUrlFilters()
  const props = {
    ...compareProps,
    ...urlFilters
  }
  return <div>
    <TopSection {...props} />
    <Table {...props} />
    <CalorieCalc />
    <CompareButtons {...props} />
    <ContentSection {...props} />
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