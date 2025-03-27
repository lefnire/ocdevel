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
    const isProd = $app.stage === "production";
    const site = new sst.aws.React("ReactRouter7", {
      path: "reactrouter7/",
      environment: {
        is_prod: isProd
      },
      domain: (isProd ? {
        name: domain,
        redirects: [`www.${domain}`]
      } : undefined),
      server: {
        edge: {
          viewerRequest: {
            injection: $interpolate`
const uri = event.request.uri.toLowerCase();
function doRedirect(location) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: {
      'location': { value: location }
    }
  }
}
if (uri.endsWith("-fitness-desk")) {
  return doRedirect("/walk"); 
}
if (uri.startsWith("/podcast")) {
  return doRedirect("/mlg"); 
}
`,
          }
        }
      }
    });
    return {
      url: site.url,
      isProd,
    }
  },
});
