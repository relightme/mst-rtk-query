import { TodoAdd } from "../Todo/TodoAdd"
import { TodoList } from "../Todo/TodoList"

import styles from "./App.styles.module.css"

export const TodoApp = () => {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>

      <div className={styles.todoListWrapper}>
        <TodoAdd />

        <TodoList />
      </div>
    </div>
  )
}
