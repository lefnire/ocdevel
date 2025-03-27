import {useParams, Outlet} from "react-router";
// import find from "lodash/find";
import {metasObj} from "~/content/blog/metas.js";
import {BackButton} from "~/components/utils";
import {Card, Container} from "react-bootstrap";
// import {ReactMarkdown_} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import React from "react";
import {fmt, PostDate} from '~/components/blog'
// import {components, renderBlogPost} from '~/components/markdown.tsx'
import {Comments} from "~/components/comments.tsx";
import type {Route} from './+types/blog.tsx'

function lastPart (path: string) {
  const parts = path.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

// git-blame for different getPostId() options
export function loader(props: Route.LoaderArgs) {
  const id = lastPart(props.request.url);
  const meta = metasObj[id];
  return { meta }
}

function Affiliate({p}) {
  if (!p.affiliate) { return null }
  return <>
    <span>.</span>
    <span className="ms-1">This post may contain affiliate links</span>
  </>
}

export default function Full(props: Route.ComponentProps) {
  const p = props.loaderData.meta;
  const id = p.id;
  return <Container>
    <BackButton to="/blog" />
    <Card>
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <PostDate p={p} />
          <Affiliate p={p} />
        </Card.Subtitle>

        <Outlet />
      </Card.Body>
      <Card.Footer>
        <Comments
          shortname="ocdevel"
          identifier={id}
          title={`${p.title} | OCDevel`}
          url={`http://ocdevel.com/blog/${id}`} />
      </Card.Footer>
    </Card>
  </Container>
}

export function meta(props: Route.MetaArgs) {
  const p = props.data.meta
  return [
    { title: p.title },
    { name: "description", content: p.teaser }
  ]
}