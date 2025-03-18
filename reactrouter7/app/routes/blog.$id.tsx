import {useParams, Outlet} from "react-router";
// import find from "lodash/find";
import metas from "~/content/blog/metas.js";
import {BackButton} from "~/components/utils";
import {Card, Container} from "react-bootstrap";
import moment from "dayjs";
// import {ReactMarkdown_} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import React from "react";
import {fmt, PostDate} from '~/components/blog'
// import {components, renderBlogPost} from '~/components/markdown.tsx'
import {Comments} from "~/components/comments.tsx";
import find from 'lodash/find'
import {renderBlogPost} from "~/components/markdown";
import fulls from "~/content/blog/fulls.tsx"

function Affiliate({p}) {
  if (!p.affiliate) { return null }
  return <>
    <span>.</span>
    <span className="ms-1">This post may contain affiliate links</span>
  </>
}

function getBlogId(props) {
  // dynamic segments support ($id)
  if (props.params?.id) {
    return props.params.id
  }
  // file routing support
  if (props.location?.pathname) {
    const parts = props.location.pathname.split('/')
    return parts[parts.length - 1]
  }
  // SSR
  if (props.request?.url) {
    const parts = props.request.url.split("/")
    return parts[parts.length - 1]
  }
  // everything else
  if (props.matches?.length) {
    const parts = props.matches[props.matches.length - 1].pathname.split('/')
    return parts[parts.length - 1];
  }
  return null
}

export default function Full(props) {
  const id = getBlogId(props)
  const p = find(fulls, {id})
  console.log({id, p})
  return <div>
    <BackButton to="/blog" />
    <Card>
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <PostDate p={p} />
          <Affiliate p={p} />
        </Card.Subtitle>

        {/* @FIXME need components={components} for MDX */}
        {renderBlogPost(p)}
        {/*<Outlet />*/}
      </Card.Body>
      <Card.Footer>
        <Comments
          shortname="ocdevel"
          identifier={id}
          title={`${p.title} | OCDevel`}
          url={`http://ocdevel.com/blog/${id}`} />
      </Card.Footer>
    </Card>
  </div>
}

export function meta(props) {
  const id = getBlogId(props)
  const p = find(fulls, {id})
  return [
    { title: p.title },
    { name: "description", content: p.teaser }
  ]
}