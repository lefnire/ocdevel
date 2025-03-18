import Card from "react-bootstrap/Card";
import {Link} from "react-router";
import moment from "dayjs";
import {type BlogPost, fmt, PostDate} from "./utils.tsx";
import {renderBlogPost} from "~/components/markdown.tsx";

interface Teaser {
  p: BlogPost
}
export function Teaser({p}: BlogPost) {
  function renderContent() {
    if (p.teaser) {
      return <p>{p.teaser}</p>
    }
    return <div className='fade-post'>
      {renderBlogPost(p)}
      <div className='fade-post-bottom'></div>
    </div>
  }

  return <Card
    key={p.id}
    className={`mb-3 card-post ${p.pinned ? 'card-pinned' : ''}`}
  >
    <Card.Body>
      <Card.Title>
        {p.pinned && <span className='float-end'>📌</span>}
        <Link to={'/blog/' + p.id}>{p.title}</Link>
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <PostDate p={p} />
      </Card.Subtitle>
      {renderContent()}
      <Link to={'/blog/' + p.id}>Read More</Link>
    </Card.Body>
  </Card>
}