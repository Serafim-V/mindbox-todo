import { UseMutationResult } from '@tanstack/react-query'
import clsx from 'clsx'
import { SyntheticEvent } from 'react'
import { Todo } from '../../types'
import { ListItem } from '../ui/listItem'
import styles from './TodoListItem.module.css'

export function TodoListItem({
  todo,
  mutation,
}: {
  todo: Todo
  mutation: unknown
}) {
  const updateTodo = async (e: SyntheticEvent<HTMLInputElement>) => {
    try {
      await (mutation as UseMutationResult).mutateAsync({
        completed: e.currentTarget.checked,
        id: String(todo.id),
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <ListItem>
      <label className={clsx([styles.todo])}>
        <input
          type="checkbox"
          hidden
          checked={todo.completed}
          onChange={updateTodo}
        />
        <span className={styles.icon}></span>
        <span className={styles.text}>{todo.todo}</span>
      </label>
    </ListItem>
  )
}
