import type {FC, ReactElement} from "react";
import type {LinksInverted} from "~/content/treadmills/utils";

interface Attribute {
  value?: number
  rating?: number
  notes? : () => ReactElement
}
type CustomVal = Omit<Attribute, 'value'>
type BoolVal = CustomVal & { value?: boolean }
type StringVal = CustomVal & { value?: string }
type NumVal = CustomVal & { value?: number }

interface Links {
  amazon: { [countryCode: string]: string }
  brand: { [countryCode: string]: string }
  // when pausing Amazon Affil, fall back to this key instead
  amazonPause?: "amazon" | "brand"
  notes?: () => ReactElement
}
// Add a modifier to this brand or product from things I see online
type PickedBy_ = {
  label?: "affiliate" | "custom" | string,
  url?: string,
  value: number
}
export interface PickedBy {
  // list of URLs complaining
  me?: number
  trusted?: PickedBy_[]
  websites?: PickedBy_[]
  affiliate?: PickedBy_[]
}

export interface Brand {
  key: string
  name: string
  links: Links
  warranty: {
    brand?: number // months
    amazon?: number // months
    notes?: () => ReactElement
  }
  fakespot: string
  location?: string
  notes?: () => ReactElement
  pickedBy: PickedBy
}
export interface Product {
  brand: Brand
  model: CustomVal & {value: string} // required
  seo?: number
  image?: string
  video?: string
  key: string
  links: Links

  dimensions: CustomVal & {
    // depth, width, height
    value?: [number, number, number],
  },
  weight: Attribute
  maxWeight: Attribute
  maxSpeed: Attribute
  horsePower: Attribute
  age: StringVal
  rating: CustomVal & {
    value?: [[number, number], [number, number, number, number, number]]
  }
  fakespot: CustomVal & {
    value?: [string, string]
  }
  price: CustomVal & {
    value: number
    sale?: number
  }
  incline: NumVal & {
    method?: "manual" | "fixed" | "auto"
  }
  shock: BoolVal
  decibels: NumVal
  app: BoolVal
  easyLube: NumVal
  // Use later
  material?: StringVal
  pickedBy: PickedBy
  pros?: StringVal[]
  cons?: StringVal[]
  card?: CardIn
}

export interface CardIn {
  cardTitle?: string
  image: ReactElement
  notes: string
  video?: string
  linkText?: string
}
export type CardOut = Omit<CardIn, 'notes' | 'title'> & {
  title: string
  key: string
  image: ReactElement
  cardTitle: string
  price: number
  link: string
  linkText: string
  notes: string | ReactElement
}

export type Computed = {
  linksInv: LinksInverted

  dimensions: number
  brand: number
  links: number
  weight: number
  maxWeight: number
  maxSpeed: number
  horsePower: number
  age: number
  rating: number
  price: number
  pickedBy: number
  incline: number
  shock: number
  decibels: number
  app: number
  easyLube: number
  total: number
}

export type Row = Product & {
  c: Computed
}