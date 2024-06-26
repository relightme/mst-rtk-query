import { onSnapshot } from "mobx-state-tree"
import { TodoListModel } from "../models/TodoLost"

export const mstStore = TodoListModel.create({})

onSnapshot(mstStore, (snapshot) => {
  console.dir(snapshot)
})
