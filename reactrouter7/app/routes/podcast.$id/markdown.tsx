// TODO remove this file! Lots changed, I think most of it is unnecessary
import {ReactMarkdown_} from "~/components/markdown";
import React from "react";

const teaserRenderers = {
  heading: ({children}) => {
    return <><strong>{children}</strong><br/></>
  }
}

const teaserMDX = {
  components: {
    h1: props => <><strong {...props} /><br/></>
  }
}

export function Markdown_({Content, teaser=false}) {
  if (!Content) {return null}
  // Switching to new MDX setup, away from ReactMarkdown
  const isMdx = typeof Content !== "string";
  const opts = teaser ? (isMdx ? teaserMDX : teaserRenderers) : {}
  return typeof Content === "string" ?
    <ReactMarkdown_ source={Content} {...opts} />
    : <Content {...opts} />;
}