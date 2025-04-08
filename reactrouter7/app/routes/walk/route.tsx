import TopSection from "./top-section";
import CompareButtons from './compare-buttons';
import {ProductProvider} from "~/routes/walk/context";
import {seoLabels} from "~/content/treadmills/scoring/seo";
import ContentSection from "~/routes/walk/content-section";
import CalorieCalc from "~/routes/walk/calorie-calc";
import {ModalSingleton} from "~/components/modal";
import {getComputed} from '~/content/treadmills/computed'
import type {Route} from './+types/route'
import * as meta_ from './meta.js'
import {lazy, Suspense} from 'react'
import Container from "react-bootstrap/cjs/Container";

const Table = lazy(() => import('./table/table'))

export function loader() {
  // calculate scores and inverted links server-side to save on render time
  return {
    computed: getComputed()
  }
}

const loading = <Container>
  <h5 className="text-center">Walking pad reviews loading...</h5>
</Container>

export default function Route({loaderData}: Route.ComponentProps) {
  const {computed} = loaderData
  return <>
    <ProductProvider computed={computed}>
      <TopSection />
      <Suspense fallback={loading}>
        <Table />
      </Suspense>
      <CompareButtons />
      <CalorieCalc />
      <ContentSection />
    </ProductProvider>
    <ModalSingleton />
  </>
}

export function meta() {
  const brands = seoLabels.slice(0, 20).join(', ')
  const desc = meta_.head.description.replace('[placeholder]', brands)
  return [
    { title: meta_.head.title },
    { name: "description", content: desc },
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