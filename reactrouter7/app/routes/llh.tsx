import React, {useMemo} from 'react';
import {llh} from '~/content/podcast';
import Podcast from '~/components/podcast/podcast.tsx'

export default function Series() {
  return <Podcast />
}

export function meta({params, matches}) {
  return [
    { title: `${llh.title} Podcast` },
    { name: "description", content: llh.teaser }
  ]
}