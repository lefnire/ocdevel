import type {ReactElement} from "react";

interface Attribute {
  value?: number
  rating?: number
  notes? : () => ReactElement
}
type BoolVal = Omit<Attribute, 'value'> & { value?: boolean }
type StringVal = Omit<Attribute, 'value'> & { value?: string }
type NumVal = Omit<Attribute, 'value'> & { value?: number }

interface Links {
  amazon: { [countryCode: string]: string }
  brand: { [countryCode: string]: string }
  // when pausing Amazon Affil, fall back to this key instead
  amazonPause?: "amazon" | "brand"
  notes?: () => ReactElement
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
  rating?: number
  location?: string
  notes?: () => ReactElement
  bump?: number
}

export interface Product {
  brand: Brand
  model: string
  seo?: number
  image?: string
  key: string
  description: string | ReactElement
  links: Links

  dimensions: Attribute | {
    value?: [number, number, number],
  },
  weight: Attribute
  maxWeight: Attribute
  maxSpeed: Attribute
  horsePower: Attribute
  age: StringVal
  rating: Omit<Attribute, 'value'> & {
    value?: [[number, number], [number, number, number, number, number]]
  }
  fakespot: Omit<Attribute, 'value'> & {
    value?: [string, string]
  }
  price: Attribute & {
    sale?: number
  }
  pickedBy: Omit<Attribute, 'value'> & {
    value?: Array<"me" | "trusted" | "public" | "websites">
  }
  incline: Attribute | {
    method?: "manual" | "static" | "auto"
  }
  shock: BoolVal
  decibels: NumVal
  sturdy: BoolVal
  app: BoolVal
  easyLube: NumVal
  amazon: BoolVal
  // Use later
  material?: StringVal
  bump?: number
  pros?: StringVal[]
  cons?: StringVal[]
}