import React, {useMemo} from 'react';
import {mlgShow} from '~/content/podcast/metas.js';
import Podcast from './podcast/podcast'

export default function Series(props) {
  return <Podcast podcastKey="mlg" show={mlgShow} />
}

export function meta() {
  return [
    { title: `${mlgShow.title} Podcast` },
    { name: "description", content: mlgShow.body }
  ]
}