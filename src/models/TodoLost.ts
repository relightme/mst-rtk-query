import { applySnapshot, destroy, flow, types } from "mobx-state-tree"

import { Todo, TodoAdd, TodoItemType } from "../types/Todo"
import { TodoModel } from "../models/Todo"
import { store } from "../api/store"
import { todoApi } from "../api/todoApi"

export const TodoListModel = types
  .model("TodoListModel", {
    todoList: types.optional(types.array(TodoModel), []),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get longestTitle() {
      return self.todoList.length ? self.todoList.reduce((a, b) => (a.title.length > b.title.length ? a : b)).title : ""
    },

    get shortestTitle() {
      return self.todoList.length ? self.todoList.reduce((a, b) => (a.title.length < b.title.length ? a : b)).title : ""
    },

    calcListLength() {
      return self.todoList.length
    },

    getFirstCustomName(name: string) {
      return self.todoList[0].title + name
    },
  }))
  .actions((self) => ({
    setLoading(state: boolean) {
      self.isLoading = state
    },
  }))
  .actions((self) => ({
    addTodo: flow(function* (todo: TodoAdd) {
      try {
        self.setLoading(true)

        const { data } = yield store.dispatch(todoApi.endpoints.addTodo.initiate(todo))

        self.todoList.push(TodoModel.create(data))
      } finally {
        self.setLoading(false)
      }
    }),

    removeTodo: flow(function* (todo: TodoItemType) {
      try {
        self.setLoading(true)

        yield store.dispatch(todoApi.endpoints.deleteTodo.initiate(todo.id))

        destroy(todo)
      } finally {
        self.setLoading(false)
      }
    }),

    updateTodo: flow(function* (todo: Todo) {
      try {
        self.setLoading(true)

        const index = self.todoList.findIndex((element) => element.id === todo.id)

        yield store.dispatch(todoApi.endpoints.updateTodo.initiate(todo))

        self.todoList[index].title = todo.title
      } finally {
        self.setLoading(false)
      }
    }),

    afterCreate: flow(function* () {
      try {
        self.setLoading(true)

        const { data } = yield store.dispatch(todoApi.endpoints.getTodoList.initiate())

        applySnapshot(self.todoList, data)
      } finally {
        self.setLoading(false)
      }
    }),
  }))
