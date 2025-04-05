import data from "~/content/treadmills/data";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/lifespan_tx6.jpg?w=100&h=100&format=avif&effort=max'

const obj = data.lifespan_tx6
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'LifeSpan TX6',
  topTitle: "Premium: LifeSpan TX6",
  notes: () => <div>
    <span>Buy it for life. Invincible, quiet, fast.</span>
    {/*<VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />*/}
  </div>,
  link: getCurrentLink(obj),
  linkText: `$${price} on Amazon`,
  price
}
export default product