import type {ReactElement} from "react";

interface Attribute {
  value?: number
  rating?: number
  flag?: "red" | "yellow" | "green"
  notes? : () => ReactElement
}
type BoolVal = Omit<Attribute, 'value'> & { value?: boolean }
type StringVal = Omit<Attribute, 'value'> & { value?: string }

export interface Product {
  make: string
  model: string
  description: string | ReactElement
  link: string

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
  quiet: BoolVal
  sturdy: BoolVal
  app: BoolVal
  easyLube: BoolVal
  amazon: BoolVal
  countries: Omit<Attribute, 'value'> & {
    value?: string[]
  }
  pros?: Attribute[]
  cons?: Attribute[]
}