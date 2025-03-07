import clsx from 'clsx'
import { Todo } from '../../types'
import { useUpdateTodo } from '../../useQueries/useUpdateTodo'
import { ListItem } from '../ui/listItem'
import styles from './TodoListItem.module.css'

export function TodoListItem({ todo }: { todo: Todo }) {
  const mutation = useUpdateTodo()

  const updateTodo = async () => {
    try {
      const updatedTodo = await mutation.mutateAsync({
        completed: !todo.completed,
        id: String(todo.id),
      })
      const index = fakeTodoList?.findIndex(fakeTodo => todo.id === fakeTodo.id)
      setFakeTodoList(prev => {
        prev[index] = updatedTodo

        return [...prev]
      })
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <ListItem key={todo.id} loading={mutation.isPending}>
      <div
        className={clsx([styles.todo, todo.completed && styles.completed])}
        onClick={updateTodo}
      >
        <span className={styles.icon}></span>
        <span className={styles.text}>{todo.todo}</span>
      </div>
    </ListItem>
  )
}
