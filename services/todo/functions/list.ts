import { Todo as STodo } from "../infrastructure/rds/todo";

export async function main() {
    return {
        statusCode: 200,
        body: JSON.stringify(await STodo.list()),
    };
}