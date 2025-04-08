import data from "~/content/treadmills/data";
import {VideoButton} from "~/components/video-btn";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/walkolution_walkolution2.png?w=100&h=100&format=avif&effort=max'

const obj = data.walkolution_walkolution2
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'Walkolution 2',
  topTitle: "Premium: Walkolution 2",
  notes: () => <div>
    <span>Invincible, 0 maintenance, 0 electricity, ergonomic.</span>
    <VideoButton href="https://walkolution.com/pages/videos" />
  </div>,
  link: getCurrentLink(obj),
  linkText: `$${price} on Walkolution`,
  price,
}
export default product