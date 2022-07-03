export * as Todo from "./todo";
import { Todo } from "../../core/todo"
import { SQL } from "./sql";

const table = "todos"
export async function create(todo: Todo) {
  const [result] = await SQL.DB.insertInto(table)
    .values({ id: todo.id, name: todo.name, description: todo.description })
    .returningAll()
    .execute();
  return result;
}

export async function list() {
  return await SQL.DB.selectFrom(table)
    .selectAll()
    .execute();
}
