import {useParams} from "react-router-dom";
import find from "lodash/find";
import blog from "../../content/blog";
import {Helmet} from "react-helmet";
import {BackButton} from "../utils";
import Card from "react-bootstrap/Card";
import moment from "moment";
import {ReactMarkdown_} from "../podcasts/utils";
import ReactDisqusComments from "react-disqus-comments";
import React from "react";
import {fmt} from './utils'

export default function Post() {
  const {id} = useParams()

  const p = find(blog, {id});
  return <div>
    <Helmet>
      <title>{p.title} | OCDevel</title>
      {/* Should use teaser here */}
      {/*<meta name="description" content="Helmet application" />*/}
    </Helmet>
    <BackButton />
    <Card>
      <Card.Body>
        <Card.Title>{p.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(p.date).format(fmt)}
        </Card.Subtitle>
        <Card.Text>
          {p.jsx ? p.body : <ReactMarkdown_ source={p.body}  />}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <ReactDisqusComments
          shortname="ocdevel"
          identifier={id}
          title={`${p.title} | OCDevel`}
          url={`http://ocdevel.com/blog/${id}`}/>
      </Card.Footer>
    </Card>
  </div>
}