import type {ReactElement} from "react";

interface Attribute {
  value?: number
  rating?: number
  flag?: "red" | "yellow" | "green"
  notes? : () => ReactElement
}
type BoolVal = Omit<Attribute, 'value'> & { value?: boolean }
type StringVal = Omit<Attribute, 'value'> & { value?: string }
type Numval = Omit<Attribute, 'value'> & { value?: number }

interface Links {
  amazon?: string
  brand?: string
  // when pausing Amazon Affil, fall back to this key instead
  amazonPause?: "amazon" | "brand"
}

export interface Brand {
  key: string
  name: string
  links?: Links
  warranty: {
    value?: string[]
    notes?: () => ReactElement
  }
  fakespot?: string
  rating?: number
  location?: string
  notes?: () => ReactElement
}

export interface Product {
  brand: Brand
  model: string
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
  incline: Attribute
  shock: BoolVal
  decibels: Numval
  sturdy: BoolVal
  app: BoolVal
  easyLube: BoolVal
  amazon: BoolVal
  countries: Omit<Attribute, 'value'> & {
    value?: string[]
  }
  bump?: number
  pros?: StringVal[]
  cons?: StringVal[]
}