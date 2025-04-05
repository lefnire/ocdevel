import data from "~/content/treadmills/data";
import {VideoButton} from "~/routes/walk/utils";
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import image from '~/assets/products/urevo_cyberpad.jpg?w=100&h=100&format=avif&effort=max'

const obj = data.urevo_cyberpad
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'Urevo CyberPad',
  topTitle: "Value: Urevo CyberPad",
  notes: () => <div>
    <span>Sturdy, quiet, feature-rich.</span>
    <VideoButton href="https://www.youtube.com/shorts/zIVv-Z3Cc10" />
  </div>,
  link: getCurrentLink(obj),
  linkText: `$${price} on Amazon`,
  price,
}
export default product