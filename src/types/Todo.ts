import { Instance } from "mobx-state-tree"
import { TodoModel } from "../models/Todo"

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type TodoAdd = Omit<Todo, "id">

export type TodoItemType = Instance<typeof TodoModel>
