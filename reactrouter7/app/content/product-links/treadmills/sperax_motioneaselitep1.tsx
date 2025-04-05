import data from "~/content/treadmills/data";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/sperax_motioneaselitep1.webp?w=100&h=100&format=avif&effort=max'

const obj = data.sperax_motioneaselitep1
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'Sperax MotionEase Lite P1',
  topTitle: "Budget: Sperax Vibration Pad",
  notes:"Test the waters. No incline, 1-2yrs life.",
  link: getCurrentLink(obj),
  linkText: `$${price} on Amazon`,
  price,
}
export default product