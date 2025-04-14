import {PostMeta} from "~/components/date-utils";
import Card from 'react-bootstrap/cjs/Card';
import {useContext} from "react";
import {EpisodeContext} from "~/routes/podcast.$id/context";
import {ShowContext} from "~/routes/podcast/context";

export function DateHeader() {
  const {episode: e} = useContext(EpisodeContext)
  const created = e.created || e.date
  const updated = e.updated

  if (!(created)) {
    return <Card.Subtitle className='mb-2 text-danger'>
      Podcast episode not yet released
    </Card.Subtitle>
  }
  return <PostMeta created={created} updated={updated} />
}

export function buildTitle() {
  const {podcastKey} = useContext(ShowContext)
  const {episode: e} = useContext(EpisodeContext)
  const num = String(e.episode).padStart(3, '0');
  const titleStart = podcastKey === "llh" ? "LLH" : e.mla ? "MLA" : "MLG"
  return `${titleStart} ${num} ${e.title}`;
}