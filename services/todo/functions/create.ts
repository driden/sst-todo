import { ulid } from "ulid";
import { Todo } from "../core/todo";
import { Todo as STodo } from "../infrastructure/rds/todo";

export async function main(event) {
    const data = JSON.parse(event.body);
    const todo: Todo = { id: ulid(), name: data.name, description: data.description }

    await STodo.create(todo)

    return {
        statusCode: 201,
        body: JSON.stringify({ success: "ok" }),
    };
}