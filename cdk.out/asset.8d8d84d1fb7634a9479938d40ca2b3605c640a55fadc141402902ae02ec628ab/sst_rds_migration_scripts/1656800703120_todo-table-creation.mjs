import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
   await db.schema 
   .createTable("todos")
   .addColumn("id", "text", col => col.primaryKey() )
   .addColumn("name", "text", col => col.notNull())
   .addColumn("description", "text")
   .execute()
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
    await db.schema.dropTable("todos").execute();
}
