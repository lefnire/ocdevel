const podcast = require('../../../src/content/machine-learning');
const moment = require('moment');
const _ = require('lodash');
const fs = require('fs');

let xml = `<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:rawvoice="http://www.rawvoice.com/rawvoiceRssModule/" version="2.0">
    <channel>
        <title>${podcast.title}</title>
        <link>${podcast.link}</link>
        <image>
            <url>${podcast.image}</url>
            <title>${podcast.title}</title>
            <link>${podcast.link}</link>
        </image>
        <description>${podcast.body || podcast.teaser}</description>
        <language>en-us</language>
        <copyright>OCDevel copyright 2017</copyright>
        <atom:link href="${podcast.feed}" rel="self" type="application/rss+xml"/>
        <lastBuildDate>${new Date()}</lastBuildDate>
        <itunes:author>OCDevel</itunes:author>
        <itunes:summary>${podcast.body || podcast.teaser}</itunes:summary>
        <itunes:subtitle>${podcast.teaser}</itunes:subtitle>
        <itunes:owner>
            <itunes:name>Tyler Renelle</itunes:name>
            <itunes:email>tylerrenelle@gmail.com</itunes:email>
        </itunes:owner>
        <itunes:explicit>No</itunes:explicit>
        <itunes:keywords>${podcast.keywords}</itunes:keywords>
        <itunes:image href="${podcast.image}"/>
        <itunes:category text="Software How-To"/>
        <pubDate>${podcast.date}</pubDate>
        ${podcast.episodes.map(e => `<item>
            <title>${e.title}</title>
            <link>${e.file.url}</link>
            <pubDate>${e.date}</pubDate>
            <description>${e.body || e.teaser}</description>
            <enclosure url="${e.file.url}" length="${e.file.length}" type="${e.file.type || 'audio/mpeg'}"/>
            <guid>${e.file.url}</guid>
            <itunes:duration>${e.file.duration}</itunes:duration>
            <itunes:summary>${e.body || e.teaser}</itunes:summary>
            <itunes:image href="${podcast.image}"/>
            <itunes:keywords>${_(podcast.keywords).concat(e.keywords).compact().uniq().values()}</itunes:keywords>
            <itunes:explicit>no</itunes:explicit>
        </item>`)}
    </channel>
</rss>`;

fs.writeFile('./machine-learning.xml', xml, 'utf-8', () => process.exit(1));

