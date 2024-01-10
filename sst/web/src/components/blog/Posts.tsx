import blog from "../../content/blog";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import moment from "moment";
import {ReactMarkdown_} from "../podcasts/utils";
import React from "react";
import {fmt} from './utils'

export default function Posts() {
  // const posts = _.sortBy(blog, e => -moment(e.date));
  const posts = blog;

  function renderPost(p) {
    return <Card key={p.id} className='mb-3 card-post'>
      <Card.Body>
        <Card.Title><Link to={'/blog/' + p.id}>{p.title}</Link></Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(p.date).format(fmt)}
        </Card.Subtitle>
        <div className='fade-post'>
          {p.jsx ? p.body : <ReactMarkdown_ source={p.body} />}
          <div className='fade-post-bottom'></div>
        </div>
        <Link to={'/blog/' + p.id}>Read More</Link>
      </Card.Body>
    </Card>
  }

  return <div>
    {posts.map(renderPost)}
  </div>
}