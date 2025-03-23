import type {Brand} from '../types'

const links = {
  amazon: {
    US: "https://amzn.to/4isyV4I",
    CA: "https://amzn.to/4hwW7NO"
  },
  brand: {
    // TODO supports all countries
    US: "https://speraxsports.com/collections/walkingpad",
    CA: "https://speraxsports.com/collections/walkingpad",
    UK: "https://speraxsports.com/collections/walkingpad",
  }
}

const info: Brand = {
  key: 'sperax',
  name: "Sperax",
  links,
  location: "China",
  rating: 6,
  warranty: {
    brand: 3,
  },
  fakespot: "B",
  notes: () => <div>Gaining popularity. I'm seeing them on various recommender sites, and with decent love in the underground.</div>
}
export default info