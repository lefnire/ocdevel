import {useFilteredTree} from "./store";
import React from "react";
import {ResourceNode} from "./common";

export default function ResourcesTree() {
  const sections = useFilteredTree()

  return <div className='resources resources-tree mb-3'>
    {sections.map(n => n && <ResourceNode node={n} key={n.id} />)}
  </div>
}
