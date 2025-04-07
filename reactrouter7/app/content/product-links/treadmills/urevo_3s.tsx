import image from '~/assets/products/urevo_3s.jpg?w=100&h=100&format=webp&effort=max'
import data from '~/content/treadmills/data'
import {getCurrentLink, getPrice} from "~/content/treadmills/utils";
import {VideoButton} from "~/components/video-btn";

const obj = data.urevo_3s
const price = getPrice(obj)
const product = {
  key: obj.key,
  image,
  title: 'Value: 3S',
  notes: () => <div>
    <span>One size fits all, bang for buck.</span>
    <VideoButton href="https://www.youtube.com/shorts/NRxkNG9Y3VU" />
  </div>,
  link: getCurrentLink(obj),
  linkText: `$${getPrice(obj)} on Amazon`,
  price,
}
export default product