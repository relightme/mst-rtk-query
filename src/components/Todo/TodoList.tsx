import { observer } from "mobx-react"

import { TodoItem } from "./TodoItem"

import { useStore } from "../../hooks/useStore"

import styles from "./Todo.styles.module.css"


export const TodoList = observer(() => {
  const store = useStore()

  return (
    <div className={styles.todoList}>
      {store.isLoading && <p>Загрузка...</p>}

      {store.todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
})
