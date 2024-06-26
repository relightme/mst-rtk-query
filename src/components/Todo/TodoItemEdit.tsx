import { ChangeEvent, useState } from "react"
import { observer } from "mobx-react"
import { TodoItemType } from "../../types/Todo"
import { useStore } from "../../hooks/useStore"

export const TodoItemEdit = observer(({ todo }: { todo: TodoItemType }) => {
  const store = useStore()

  const [newTitle, setNewTitle] = useState(todo.title)

  const handleSave = () => {
    store.updateTodo({
      ...todo,
      title: newTitle,
    })

    todo.toggleEditing()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.target.value)

  return (
    <>
      <input type="text" value={newTitle} onChange={onChange} disabled={store.isLoading} />

      <button onClick={handleSave} disabled={store.isLoading}>
        Сохранить
      </button>
    </>
  )
})
