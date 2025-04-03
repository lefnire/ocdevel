import type {EpisodeComponent} from "~/routes/podcast/types";
import {dateFmt} from "~/components/utils";
import Card from 'react-bootstrap/cjs/Card';
import moment from "dayjs";
import padStart from "lodash/padStart";

export function DateHeader({episode: e}: EpisodeComponent) {
  if (!(e.created || e.date)) {
    return <Card.Subtitle className='mb-2 text-danger'>
      Podcast episode not yet released
    </Card.Subtitle>
  }
  return <Card.Subtitle className='text-muted mb-2'>
    {moment(e.created).format(dateFmt)}
    {e.updated && <>
      <span> (updated {moment(e.updated).format(dateFmt)})</span>
    </>}
  </Card.Subtitle>
}

export function buildTitle({episode: e, podcastKey}: EpisodeComponent) {
  const num = padStart(e.episode, 3, '0');
  const titleStart = podcastKey === "llh" ? "LLH" : e.mla ? "MLA" : "MLG"
  return `${titleStart} ${num} ${e.title}`;
}