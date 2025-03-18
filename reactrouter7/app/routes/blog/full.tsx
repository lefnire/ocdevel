import {useParams, Outlet} from "react-router";
import find from "lodash/find";
import blog from "../../content/blog";
import {BackButton} from "~/components/utils";
import Card from "react-bootstrap/Card";
import moment from "dayjs";
import {ReactMarkdown_} from "~/components/utils";
// import ReactDisqusComments from "react-disqus-comments";
import React from "react";
import {fmt, PostDate} from './utils'
import {components, renderBlogPost} from '~/components/markdown.tsx'
import {Comments} from "~/components/comments.tsx";

function Affiliate({p}) {
  if (!p.affiliate) { return null }
  return <>
    <span>.</span>
    <span className="ms-1">This post may contain affiliate links</span>
  </>
}

function getPost(props) {
  const id = props.params?.id || (() => {
    const matches = props.matches
    const parts = matches[matches.length - 1].pathname.split('/')
    return parts[parts.length - 1];
  })()
  return find(blog, {id});
}

export default function Full(props) {
  const p = getPost(props)
  const id = p.id
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
  const p = getPost(props)
  return [
    { title: p.title },
    { name: "description", content: p.teaser }
  ]
  // @FIXME
  // <Helmet>
  //     <title>{p.title} | OCDevel</title>
  //     {/* Should use teaser here */}
  //     {/*<meta name="description" content="Helmet application" />*/}
  //   </Helmet>
}