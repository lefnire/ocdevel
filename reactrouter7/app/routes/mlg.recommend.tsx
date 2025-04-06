import Card from 'react-bootstrap/cjs/Card';
// import ReactDisqusComments from "react-disqus-comments";
import {BackButton} from "~/components/back-btn";
import {mlgShow} from "~/content/podcast/metas.js";
import {Comments} from "~/components/comments";

export default function Recommend() {
  return <Card>
    <Card.Body>
      <BackButton />
      <Card.Title>Recommend a Future Episode</Card.Title>
      <Card.Text>
        <p>See which episodes are currently planned <a href="https://github.com/lefnire/ocdevel/projects/1" target="_blank">on Github</a>. If you want an episode not on that list, <a href="https://github.com/lefnire/ocdevel/issues/new" target="_blank">submit an issue</a>. I'll tackle recommendations in order of popularity (based on Github thumb-ups).</p>
        <p>Below is a Disqus thread I <em>used</em> to use for episode-recommends, but I'm not using anymore.</p>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Comments
        shortname="ocdevel"
        identifier="machine-learning-recommend"
        title={`Recommend an Episode | ${mlgShow.title}`}
        url="https://ocdevel.com/mlg/recommend" />
    </Card.Footer>
  </Card>
}