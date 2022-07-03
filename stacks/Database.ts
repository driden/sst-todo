import { RDS, StackContext } from "@serverless-stack/resources";

import * as rds from "aws-cdk-lib/aws-rds";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export function Database({ stack }: StackContext) {
  const username = "clusteradmin";
  const dbName = "TodoDb";
  // const secret = new rds.DatabaseSecret(stack, 'AuroraSecret', {
  //   username: 'clusteradmin',
  // });


  const secret = new secretsmanager.Secret(
    stack,
    'ClusterCredentials',
    {
      secretName: dbName + "ClusterCredentials",
      description: dbName + "ClusterCredentials",
      generateSecretString: {
        excludeCharacters: "\"@/\\ '",
        generateStringKey: 'password',
        passwordLength: 30,
        secretStringTemplate: JSON.stringify({ username }),
      },
    },
  );

  const clusterCrendentials = rds.Credentials.fromSecret(
    secret,
    username
  );

  const rdscluster = new RDS(stack, "Database", {
    engine: "postgresql10.14",
    migrations: "services/todo/infrastructure/rds/migrations",
    types: "services/todo/infrastructure/rds/types.ts",
    defaultDatabaseName: "todo",
    cdk: {
      cluster: {
        credentials: rds.Credentials.fromSecret(secret, username)
      }
    }
  });

  return rdscluster;
}
