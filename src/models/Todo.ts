import { types } from "mobx-state-tree"

export const TodoModel = types
  .model("TodoModel", {
    id: types.number,
    userId: types.number,
    title: types.optional(types.string, ""),
    completed: types.optional(types.boolean, false),
    isEditing: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setTitle(title: string) {
      self.title = title
    },

    toggle() {
      self.completed = !self.completed
    },

    toggleEditing() {
      self.isEditing = !self.isEditing
    },
  }))