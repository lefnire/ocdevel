import {
  createContext,
  type PropsWithChildren,
} from "react";
import type {Resource} from "~/content/podcast/resources/resources.types";
import {PopoverSingleton} from "~/components/popover";

// --- Resource Cache Context ---
// Define the shape of the flat resource lookup
type FlatResources = { [id: string]: Resource };

type ResourceCacheContextType = {
  flat: FlatResources; // Add the flat resource lookup
};

// Rename context
export const ResourceCacheContext = createContext<ResourceCacheContextType>({
  flat: {},
});

export function ResourceCacheProvider({children, flat}: PropsWithChildren<{ flat: FlatResources }>) {
  // git-blame: cached icon renders

  return <>
    <ResourceCacheContext.Provider value={{flat}}>
      {children}
    </ResourceCacheContext.Provider>
    <PopoverSingleton />
  </>
}