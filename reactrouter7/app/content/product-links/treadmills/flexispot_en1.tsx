import image from '~/assets/products/flexispot_en1.jpg?w=100&h=100&format=webp&effort=max'
import links from '~/content/product-links'
const product_ = links.flexispot_en1
const product = {
  ...product_,
  image,
  topTitle: "Desk: FlexiSpot",
  notes: 'Electric sit/stand',
  linkText: `$${product_.price} on Amazon`
}
export default product