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
      domain: {
        name: domain,
        redirects: [`www.${domain}`]
      },
    });
    return {
      url: site.url,
    }
  },
});
