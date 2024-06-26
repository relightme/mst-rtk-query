import { observer } from "mobx-react"

import { TodoItemEdit } from "./TodoItemEdit"

import { useStore } from "../../hooks/useStore"
import { TodoItemType } from "../../types/Todo"

import styles from "./Todo.styles.module.css"

export const TodoItem = observer(({ todo }: { todo: TodoItemType }) => {
  const store = useStore()

  const handleDelete = () => {
    store.removeTodo(todo)
  }

  const handleCopy = () => {
    store.addTodo(todo)
  }

  const handleToggleCompletion = () => {
    todo.toggle()
  }

  const handleEditModeEnable = () => {
    todo.toggleEditing()
  }

  return (
    <div className={styles.todoItem}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleCompletion}
        className={styles.todoItemCheckbox}
        disabled={todo.isEditing || store.isLoading}
      />

      {!todo.isEditing ? (
        <>
          <span
            className={styles.todoItemText}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>

          <button onClick={handleEditModeEnable} disabled={store.isLoading}>
            Редактировать
          </button>

          <button onClick={handleDelete} disabled={store.isLoading}>
            Удалить
          </button>

          <button onClick={handleCopy} disabled={store.isLoading}>
            Копировать
          </button>
        </>
      ) : (
        <TodoItemEdit todo={todo} />
      )}
    </div>
  )
})
