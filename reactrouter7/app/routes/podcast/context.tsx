import {createContext} from "react";
import type {ShowType} from "~/routes/podcast/types";

type ShowContext = {
  podcastKey: "mlg" | "llh"
  show: ShowType
  img: string
}
// @ts-ignore
export const ShowContext = createContext<ShowContext>()