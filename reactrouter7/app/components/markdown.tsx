import ReactMarkdown from "react-markdown";
import React from "react";
import {Link} from "react-router";

const renderers = {
  // TODO convert h2 to h3
  // heading: (props) => {
  //   return createElement(`h${props.level}`, getCoreProps(props), props.children)
  // },
  link: ({href, children}) => {
    if (href[0] === '/') {
      return <Link to={href}>{children}</Link>
    }
    return <a href={href} target='_blank'>{children}</a>
  }
}

export function ReactMarkdown_(props) {
  const {children, source, ...rest} = props

  const props_ = {
    ...rest,
    children: children || source,
    components: props.renderers? {...renderers, ...props.renderers} : renderers
  }
  return <ReactMarkdown {...props_}/>
}