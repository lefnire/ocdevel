import data from "~/content/treadmills/data";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/urevo_strol2spro.png?w=100&h=100&format=avif&effort=max'

const obj = data.urevo_strol2spro
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'Strol 2S Pro',
  topTitle: "Value: Urevo Strol 2S Pro",
  notes: () => <div>Sturdy, quiet, can run.</div>,
  link: getCurrentLink(obj),
  linkText: `$${price} on Amazon`,
  price,
}
export default product