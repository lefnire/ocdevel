import type {ReactElement} from "react";

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
export interface Bump {
  // list of URLs complaining
  up?: string[]
  // list of URLs glowing
  down?: string[]
  // list of URLs pedaling
  seo?: string[]
  // extra from research (eg years before I started collecting this)
  extra?: number
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
  bump?: Bump
}
export interface Product {
  brand: Brand
  model: string
  seo?: number
  image?: string
  key: string
  description: string | ReactElement
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
  price: Attribute & {
    sale?: number
  }
  pickedBy: CustomVal & {
    value?: Array<"me" | "trusted" | "affiliate" | "public" | "websites">
  }
  incline: NumVal & {
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
  bump?: Bump
  pros?: StringVal[]
  cons?: StringVal[]
}