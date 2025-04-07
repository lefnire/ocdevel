import {VideoButton} from "~/components/video-btn";
import image from '~/assets/products/godora_lube.jpg?w=100&h=100&format=webp&effort=max'
import links from '~/content/product-links'
const product_ = links.godora_lube
const product = {
  ...product_,
  image,
  topTitle: 'Lube: Godora',
  notes: () => <div>
    <span>Silicone treadmill lubricant. Apply every 50hrs</span>
    <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
  </div>,
  linkText: `$${product_.price} on Amazon`
}
export default product