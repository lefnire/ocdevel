import React, {memo} from "react";
import {filters} from "~/content/podcast/resources/filters";
import {PopoverTrigger} from "~/components/popover";

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
  console.log(renders)

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