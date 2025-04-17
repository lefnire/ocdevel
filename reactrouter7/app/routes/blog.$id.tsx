import {Outlet} from "react-router";
import {metasObj} from "~/content/blog/metas.js";
import {BackButton} from "~/components/back-btn";
import Card from 'react-bootstrap/cjs/Card';
import Container from 'react-bootstrap/cjs/Container';
// import ReactDisqusComments from "react-disqus-comments";
import {PostMeta} from '~/components/date-utils'
import {Comments} from "~/components/comments";
import type {Route} from './+types/blog.$id.tsx'
import type {BlogPost} from "~/routes/blog/types";
import {Battlestation} from "~/components/battlestation";

function lastPart (path: string) {
  const parts = path.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

// git-blame for different getPostId() options
export function loader(props: Route.LoaderArgs) {
  const pathname = (new URL(props.request.url)).pathname;
  const id = lastPart(pathname);
  const meta = metasObj[id] as BlogPost;
  return { meta }
}

export default function Full(props: Route.ComponentProps) {
  const p = props.loaderData.meta;
  const id = p.id;
  return <div>
    <BackButton to="/blog" label="All Posts" />
    <Card>
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <PostMeta created={p.date} updated={p.updated} affiliate={p.affiliate}/>
        <Outlet />
      </Card.Body>
      <div className="d-xs-block d-md-none">
        <Battlestation />
      </div>
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

export function meta(props: Route.MetaArgs) {
  const p = props.data.meta
  return [
    { title: p.head?.title || p.title },
    { name: "description", content: p.head?.description || p.teaser }
  ]
}