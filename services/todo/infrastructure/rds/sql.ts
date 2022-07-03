import RDSDataService from "aws-sdk/clients/rdsdataservice";
import { Kysely, Selectable } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import type { Types } from "./types";

export const DB = new Kysely<Types>({
  dialect: new DataApiDialect({
    mode: "postgres",
    driver: {
      secretArn: process.env.RDS_SECRET_ARN!,
      resourceArn: process.env.RDS_ARN!,
      database: process.env.RDS_DATABASE!,
      client: new RDSDataService(),
    },
  }),
});

export type Row = {
  [Key in keyof Types]: Selectable<Types[Key]>;
};

export * as SQL from "./sql";
