import {useParams, Outlet} from "react-router";
// import find from "lodash/find";
// import metaObjects from "~/content/blog/metas.js";
import {BackButton} from "~/components/utils";
import {Card, Container} from "react-bootstrap";
import moment from "dayjs";
// import {ReactMarkdown_} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import React from "react";
import {fmt, PostDate} from '~/components/blog'
// import {components, renderBlogPost} from '~/components/markdown.tsx'
import {Comments} from "~/components/comments.tsx";

export async function loader(props) {
  const id = getBlogId(props);
  const metaObjects = import.meta.glob('/app/routes/blog*/meta.js');
  const meta = metaObjects[`/app/routes/blog.${id}/meta.js`]
  const resolved = await meta()
  return { p: resolved }
}

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
  // const p = getPost(props)
  const p = props.loaderData.p
  const id = p.id
  return <Container className="blog">
    <BackButton to="/blog" />
    <Card>
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <PostDate p={p} />
          <Affiliate p={p} />
        </Card.Subtitle>

        {/* @FIXME need components={components} for MDX */}
        {/*{renderBlogPost(p)}*/}
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

export function meta(props) {
  const p = props.data.p
  return [
    { title: p.title },
    { name: "description", content: p.teaser }
  ]
}