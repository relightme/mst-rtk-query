import { ChangeEvent, useState } from "react"
import { observer } from "mobx-react"

import { useStore } from "../../hooks/useStore"

import styles from "./Todo.styles.module.css"


export const TodoAdd = observer(() => {
  const store = useStore()

  const [title, setTitle] = useState("")

  const onButtonClick = async () => {
    const trimmedTitle = title.trim()

    if (trimmedTitle) {
      store.addTodo({
        userId: 1,
        title: trimmedTitle,
        completed: false,
      })

      setTitle("")
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)

  return (
    <div className={styles.todoAdd}>
      <input type="text" value={title} onChange={onChange} placeholder="Добавить новую задачу" />

      <button onClick={onButtonClick} disabled={!title.trim().length}>
        Добавить TODO
      </button>
    </div>
  )
})
