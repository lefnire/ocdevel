import image from '~/assets/products/urevo_mat.jpg?w=100&h=100&format=webp&effort=max'
import links from '../index'
const obj = links.urevo_mat
const product = {
  ...obj,
  topTitle: "Mat: Urevo",
  image,
  linkText: `$${obj.price} on Amazon`
}
export default product