import blog from "../../content/blog";
import React from "react";
import {BlogPost, fmt} from './utils'
import {Teaser} from './Teaser.tsx'

export default function List() {
  // const posts = _.sortBy(blog, e => -moment(e.date));
  const posts = blog;

  return <div>
    {posts.map(p => <Teaser key={p.id} p={p} />)}
  </div>
}