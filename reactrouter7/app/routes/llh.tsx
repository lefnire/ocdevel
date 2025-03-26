import React from 'react';
import {llhShow} from '~/content/podcast/metas.js';
import Podcast from './podcast/podcast'

export default function Series() {
  return <Podcast podcastKey="llh" show={llhShow} />
}

export function meta() {
  return [
    { title: `${llhShow.title} Podcast` },
    { name: "description", content: llhShow.body }
  ]
}