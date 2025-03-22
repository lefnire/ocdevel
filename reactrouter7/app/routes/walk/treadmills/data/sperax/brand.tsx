import type {Brand} from '../types'

const info: Brand = {
  key: 'sperax',
  name: "Sperax",
  links: {
    amazon: "https://amzn.to/4isyV4I",
    brand: "https://speraxsports.com/collections/walkingpad",
  },
  location: "China",
  rating: 6,
  warranty: {
    brand: 3,
  },
  countries: {
    brand: ["US", "UK", "CA", "DE"],
    amazon: [],
  },
  fakespot: "B",
  notes: () => <div>Gaining popularity. I'm seeing them on various recommender sites, and with decent love in the underground.</div>
}
export default info