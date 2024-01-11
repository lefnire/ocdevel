import { StackContext, Api, EventBus, StaticSite } from "sst/constructs";

export function Web({ stack }: StackContext) {
  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      // VITE_APP_API_URL: api.url,
    },
    customDomain: {
      domainName: "ocdevel.com",
      domainAlias: "www.ocdevel.com",
    },
  });
}

export function API({ stack }: StackContext) {
  return; // TODO
  const bus = new EventBus(stack, "bus", {
    defaults: {
      retries: 10,
    },
  });

  const api = new Api(stack, "api", {
    defaults: {
      function: {
        bind: [bus],
      },
    },
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /todo": "packages/functions/src/todo.list",
      "POST /todo": "packages/functions/src/todo.create",
    },
  });

  bus.subscribe("todo.created", {
    handler: "packages/functions/src/events/todo-created.handler",
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
