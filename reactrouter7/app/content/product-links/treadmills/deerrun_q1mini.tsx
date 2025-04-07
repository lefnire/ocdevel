import data from "~/content/treadmills/data";
import {VideoButton} from "~/components/video-btn";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/deerrun_q1mini.jpg?w=100&h=100&format=avif&effort=max'

const obj = data.deerrun_q1mini
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'DeerRun Q1',
  topTitle: 'Budget: DeerRun Q1',
  notes: () => <div>
    <span>Test the waters. No incline, 1-2yrs life.</span>
    <VideoButton href="https://www.youtube.com/shorts/PWtwSiv2VzI" />
  </div>,
  link: getCurrentLink(obj),
  linkText: `$${price} on Amazon`,
  price: price,
}
export default product