/// <reference path="./.sst/platform/config.d.ts" />

const domain = "ocdevel.com"
export default $config({
  app(input) {
    return {
      name: "ocdevel",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const site = new sst.aws.React("ReactRouter7", {
      path: "reactrouter7/",
    });
    const router = new sst.aws.Router("MyRouter", {
      domain: {
        name: domain,
        redirects: [`www.${domain}`]
      },
      routes: {
        "/*": {
          url: site.url,
          edge: {
            viewerRequest: {

              injection: $interpolate`
                if (
                    // event.request.uri '/blog/20240109-fitness-desk'
                    event.request.uri.toLowerCase().includes('walk2')
                ) {
                  event.request = {
                    status: '302',
                    statusDescription: 'Found',
                    headers: {
                      location: [{
                        key: 'Location',
                        value: '${site.url}/walk'
                      }]
                    }
                  }
                }
              `,
            },
          }
          // rewrite: {
          //   regex: "^/blog/20240109-fitness-desk$",
          //   to: "/walk"
          // }
        },
        // // "/blog/20240109-fitness-desk": site.url.apply(url => `${url}/walk`),
        // "/blog/20240109-fitness-desk": {
        //   rewrite: {
        //     regex: "^/api/(.*)$",
        //     to: "/$1"
        //   }
        // },
        // "/20240110-fitness-desk": site.url.apply(url => `${url}/walk`),
        // "/podcast": site.url.apply(url => `${url}/mlg`)
      }
    });
    return {
      url: site.url,
      router: router.url
    }
  },
});
