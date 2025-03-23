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
        "/*": site.url,
      }
    });
    return {
      url: site.url,
      router: router.url
    }
  },
});
