import Button from 'react-bootstrap/cjs/Button';
import Container from 'react-bootstrap/cjs/Container';
import {ProductContext} from "~/routes/walk/context";
import {useContext} from "react";
import type {Route} from './+types/route'

type CompareButtons = Pick<Route.ComponentProps['loaderData'], 'seo'>
export default function CompareButtons({seo: {combos, labels, metaDescription}}: CompareButtons) {
  const {isCompareMode, isFiltered, handleCompare} = useContext(ProductContext)
  if (isCompareMode) { return null; }
  if (isFiltered) { return null; }
  // Get top product combinations based on SEO

  const brands = labels.join(', ')
  const desc = metaDescription.replace('[placeholder]', brands)

  function renderButton(combo: typeof combos[0], i: number) {
    const [a, b] = combo
    return (
      <Button
        key={`compare-${i}`}
        variant="light"
        size="sm"
        className="me-2 whitespace-nowrap"
        onClick={() => handleCompare(a.key, b.key)}
      >
        {/*{a.brand} {dataObj[a.key].model} vs {b.brand} {dataObj[b.key].model}*/}
        {a.brand} vs {b.brand}
      </Button>
    );
  }
  
  return <Container>
    <p>{desc}</p>
    <h4 className='text-center'>Popular Comparisons</h4>
    <div className="d-flex overflow-auto pb-2">
      {combos.map(renderButton)}
    </div>
  </Container>
}