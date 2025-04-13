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
      domain: (isProd ? {
        name: domain,
        redirects: [`www.${domain}`]
      } : undefined),
      server: {
        edge: {
          viewerRequest: {
            injection: $interpolate`
const uri = event.request.uri.toLowerCase();
const codes = {
  301: "Moved Permanently",
  302: "Temporary Redirect",
};
function doRedirect(location, statusCode) {
  return {
    statusCode: statusCode,
    statusDescription: codes[statusCode],
    headers: {
      'location': { value: location }
    }
  }
}
if (uri.endsWith("-fitness-desk")) {
  return doRedirect("/walk", 301); 
}
if (uri.startsWith("/podcast")) {
  return doRedirect("/mlg", 301); 
}
if (uri === "/creator") {
  return doRedirect("https://get.descript.com/x3fdos9pxq4r", 302);
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
