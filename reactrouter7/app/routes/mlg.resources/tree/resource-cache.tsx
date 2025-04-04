import React, { // Import React for JSX type
  createContext, memo,
  type PropsWithChildren,
  type ReactElement,
  useCallback,
  useContext,
  useRef,
} from "react";
import {filters} from '~/content/podcast/resources/filters';
import type {Resource, FilterKey} from "~/content/workflowy/mlg-resources.types";
import {PopoverTrigger} from "~/components/popover";

// --- Resource Cache Context ---
// Define the shape of the flat resource lookup
type FlatResources = { [id: string]: Resource };

type ResourceCacheContextType = {
  flat: FlatResources; // Add the flat resource lookup
  renderIcon: (id: string) => ReactElement;
};

// Rename context
export const ResourceCacheContext = createContext<ResourceCacheContextType>({
  flat: {},
  renderIcon: (() => <></>)
});

// Accept flat data as a prop
export function ResourceCacheProvider({children, flat}: PropsWithChildren<{ flat: FlatResources }>) {
  const iconCache = useRef<{ [id: string]: ReactElement }>({});

  const renderIcon = useCallback((id: string) => {
    if (!iconCache.current[id]) {
      iconCache.current[id] = <Icon key={id} id={id} />
    }
    return iconCache.current[id];
  }, []);

  // Combine flat data and getOrRenderIcon in the context value
  const contextValue = React.useMemo(() => ({
    flat,
    renderIcon,
  }), [flat, renderIcon]);

  return (
    <ResourceCacheContext.Provider value={contextValue}>
      {children}
    </ResourceCacheContext.Provider>
  );
}

// --- End Resource Cache Context ---

let renders: { [key: string]: number } = {}

export const Icon = memo(({id}: {id: string}) => {
  const [filterKey, opt] = id.split('-')
  const filter = filters[filterKey];
  const resourceFilter = filter?.opts?.[opt]
  if (!resourceFilter) return null; // Handle case where value might be missing/falsy
  const className = [
    "me-2 text-muted",
    `icon-${id}`
  ].join(' ')
  renders[id] = renders[id] ? renders[id] + 1 : 1;
  //console.log(renders)

  return <PopoverTrigger
    trigger={["hover", "focus"]}
    placement="bottom"
    content={{
      title: undefined,
      body: () => <>
        <h6>{filter.t}</h6>
        <p className='small'>{filter.d}</p>
        <h6>{resourceFilter.i} {resourceFilter.t}</h6>
        <p className='small'>{resourceFilter.d}</p>
        <div className='text-primary'>Click item for details</div>
      </>
    }}
  >
    {/* Use lookup for key for stability if filterKey can change */}
    <span className={className}>{resourceFilter.i}</span>
  </PopoverTrigger>
})

// const cache: any = {}
// export function renderIcon_(filterKey: string, opt: string) {
//   const id = `${filterKey}-${opt}`
//   if (!cache[id]) {
//     cache[id] = <Icon key={id} filterKey={filterKey} opt={opt} />
//   }
//   return cache[id];
// }