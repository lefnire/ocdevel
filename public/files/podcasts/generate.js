const podcasts = {
  'machine-learning': require('../../../src/content/machine-learning'),
  // 'web-development': require('../../../src/content/web-development'),
};
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');

let count = 0;
const fmt = 'ddd, DD MMM YYYY 00:00:00';

const _escape = (str) => {
  return _.escape(str) // remove html entities
    .replace(/\[(.*?)\](?=\()/g, '$1 '); // change links from `[a](a.com)` to a (a.com)
};

_.each(podcasts, (podcast, key) => {
  let xml = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>${_.escape(podcast.title)}</title>
        <link>${podcast.link}</link>
        <image>
            <url>${podcast.image}</url>
            <title>${_escape(podcast.title)}</title>
            <link>${podcast.link}</link>
        </image>
        <description>${_escape(podcast.body || podcast.teaser)}</description>
        <language>en-us</language>
        <copyright>OCDevel copyright 2017</copyright>
        <atom:link href="${podcast.feed}" rel="self" type="application/rss+xml"/>
        <lastBuildDate>${moment().format(fmt)} EST</lastBuildDate>
        <itunes:author>OCDevel</itunes:author>
        <itunes:summary>${_escape(podcast.body || podcast.teaser)}</itunes:summary>
        <itunes:subtitle>${_escape(podcast.teaser)}</itunes:subtitle>
        <itunes:owner>
            <itunes:name>Tyler Renelle</itunes:name>
            <itunes:email>tylerrenelle@gmail.com</itunes:email>
        </itunes:owner>
        <itunes:explicit>No</itunes:explicit>
        <itunes:keywords>${podcast.keywords}</itunes:keywords>
        <itunes:image href="${podcast.image}"/>
        <itunes:category text="Technology">
          <itunes:category text="Information Technology"/>
        </itunes:category>
        <pubDate>${moment(podcast.date).format(fmt)} EST</pubDate>
        ${_(podcast.episodes).map(e => `<item>
            <title>${_.escape(e.title)}</title>
            <link>${e.file.url}</link>
            <pubDate>${moment(e.date).format(fmt)} EST</pubDate>
            <description>${_escape(e.body || e.teaser)}</description>
            <enclosure url="${e.file.url}" length="${e.file.length}" type="${e.file.type || 'audio/mpeg'}"/>
            <guid>${e.guid}</guid>
            <itunes:duration>${e.file.duration}</itunes:duration>
            <itunes:subtitle>${_escape(e.teaser)}</itunes:subtitle>
            <itunes:summary>${_escape(e.body || e.teaser)}</itunes:summary>
            <itunes:image href="${podcast.image}"/>
            <itunes:keywords>${_(podcast.keywords).concat(e.keywords).compact().uniq().values()}</itunes:keywords>
            <itunes:explicit>no</itunes:explicit>
        </item>`).reverse().join('\n')}
    </channel>
</rss>`;

  fs.writeFile(`./${key}/feed.xml`, xml, 'utf-8', () => {
    count++;
    if (count === 2) process.exit(1);
  });
});

