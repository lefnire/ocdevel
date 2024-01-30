import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import moment from "moment/moment";
import {BlogPost, fmt} from "./utils.tsx";
import {renderBlogPost} from "../utils/markdown.tsx";

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

  return <Card key={p.id} className='mb-3 card-post'>
    <Card.Body>
      <Card.Title><Link to={'/blog/' + p.id}>{p.title}</Link></Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        {moment(p.date).format(fmt)}
      </Card.Subtitle>
      {renderContent()}
      <Link to={'/blog/' + p.id}>Read More</Link>
    </Card.Body>
  </Card>
}