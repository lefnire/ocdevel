import links from '~/content/product-links'
const product_ = links.sekoday_lube
const product = {
  ...product_,
  linkText: `$${product_.price} on Amazon`
}
export default product

