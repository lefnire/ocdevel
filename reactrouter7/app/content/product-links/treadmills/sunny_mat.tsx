import image from '~/assets/products/sunny_mat_.jpg?w=100&h=100&format=webp&effort=max'
import links from '~/content/product-links'
const product_ = links.sunny_mat
const sunny_mat = {
  ...product_,
  topTitle: "Mat: Sunny",
  image: image,
  notes: 'Prevents floor damage, protects knees',
  linkText: `$${product_.price} on Amazon`
}
export default sunny_mat
