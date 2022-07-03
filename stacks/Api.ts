import {
  StackContext,
  use,
  Api as ApiGateway,
} from "@serverless-stack/resources";
import { Database } from "./Database";

export function Api({ stack }: StackContext) {
  const db = use(Database);

  const api = new ApiGateway(stack, "todo-api", {
    defaults: {
      function: {
        permissions: [db],
        environment: {
          RDS_SECRET_ARN: db.secretArn,
          RDS_ARN: db.clusterArn,
          RDS_DATABASE: db.defaultDatabaseName,
        },
      },
      authorizer: "iam"
    },
    routes: {
      "GET    /todos": "todo/functions/list.main",
      "POST   /todos": "todo/functions/create.main",
    },
  });

  stack.addOutputs({
    API_URL: api.url,
  });

  return api;
}
