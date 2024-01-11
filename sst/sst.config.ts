import { SSTConfig } from "sst";
import { API, Web } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "ocdevel",
      region: "us-east-1",
    };
  },
  stacks(app) {
    // app.stack(API);
    app.stack(Web);
  }
} satisfies SSTConfig;
