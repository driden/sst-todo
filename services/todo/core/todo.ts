import { ULID } from "ulid"

export interface Todo {
  id: string,
  name: string,
  description?: string
}