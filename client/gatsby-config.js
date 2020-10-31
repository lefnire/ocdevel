/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },

    `gatsby-plugin-mdx`,

    {
      resolve: `gatsby-plugin-podcast-feed-mdx`,
      options: {
        title: `Podcast Title`,
        subtitle: `A pithy tagline`,
        description: `Podcast description`,
        summary: `Podcast summary`,
        podcastType: `episodic`,
        siteUrl: `https://podcast.com`,
        imageUrl: `https://podcast.com/podcast-image/png`,
        feedUrl: `https://podcast.com/pocast-rss-feed.xml`,
        language: `en-au`,
        copyright: `Copyright © 2020 Some Owner`,
        authorName: `The Author`,
        ownerName: `The Owner`,
        ownerEmail: `owner@podcast.com`,
        managingEditor: `editor@podcast.com`,
        webMaster: `support@podcast.com`,
        explicit: `no`,
        publicationDate: `Jan 25, 2020 10:00:00 GMT`,
        category1: `Arts`,
        subCategory1: `Books`,
        category2: `Education`,
        subCategory2: `Courses`,
        category3: `Business`,
        subCategory3: `Marketing`,
        timeToLive: `60`,
        outputPath: `/podcast-rss-feed.xml`
      },
    }
  ],
}
