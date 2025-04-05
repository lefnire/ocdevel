import {VideoButton} from "~/routes/walk/utils";
import image from '~/assets/products/godora_lube.jpg?w=100&h=100&format=webp&effort=max'
const price = 35
const godora_lube = {
  key: "godora_lube",
  image,
  title: 'Godora Lube',
  topTitle: 'Lube: Godora',
  notes: () => <div>
    <span>Silicone treadmill lubricant. Apply every 50hrs</span>
    <VideoButton href="https://www.youtube.com/shorts/QK-BGSrCFXY" />
  </div>,
  price,
  link: "https://amzn.to/3E7YUPw",
  linkText: `$${price} on Amazon`
}
export default godora_lube