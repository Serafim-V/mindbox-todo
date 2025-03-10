import { useCallback, useMemo } from 'react'
import { Todo } from '../../types'
import { useAddTodo } from '../../useQueries/useAddTodo'
import { useDeleteTodo } from '../../useQueries/useDeleteTodo'
import { useGetTodoList } from '../../useQueries/useGetTodoList'
import { TodoListFooter } from '../todoListFooter/TodoListFooter'
import { TodoListHeader } from '../todoListHeader/TodoListHeader'
import { TodoListItem } from '../todoListItem'
import { List } from '../ui/list'
import { useTab } from '../ui/tab/useTab'

export function TodoList() {
  const { data, isLoading } = useGetTodoList()

  const {
    mutateAsync: addTodoMutateAsync,
    isPending: addTodoLoading,
    error,
    isError,
  } = useAddTodo()
  const deleteTodo = useDeleteTodo()

  const addTodo = useCallback(
    async (formData: FormData) => {
      const todo = formData.get('todo')?.toString()
      if (todo) {
        try {
          await addTodoMutateAsync({ todo })
        } catch (error) {
          console.log('Error', error)
        }
      }
    },
    [addTodoMutateAsync],
  )

  const clearCompleted = useCallback(async () => {
    if (data?.todos) {
      try {
        Promise.all(
          data?.todos
            .filter(todo => todo.completed === true)
            .map(todo => deleteTodo.mutateAsync(String(todo.id))),
        )
      } catch (error) {
        console.log('Error', error)
      }
    }
  }, [data?.todos, deleteTodo])

  const tabProps = useTab({
    defaultValue: 1,
    data: [
      { id: 1, text: 'All' },
      { id: 2, text: 'Active' },
      { id: 3, text: 'Completed' },
    ],
  })

  const todos = useMemo(() => {
    if (tabProps.activeTab === 2) {
      return data?.todos?.filter((todo: Todo) => todo.completed === false)
    }
    if (tabProps.activeTab === 3) {
      return data?.todos?.filter((todo: Todo) => todo.completed === true)
    }

    return data?.todos || []
  }, [data?.todos, tabProps.activeTab])

  const itemsLeft = useMemo(() => {
    return data ? data?.total - data?.limit : 0
  }, [data])

  return (
    <div>
      <div>{isError && <p>Error: {JSON.stringify(error)}</p>}</div>
      <List
        loading={isLoading || addTodoLoading || deleteTodo.isPending}
        header={<TodoListHeader addTodo={addTodo} />}
        footer={
          <TodoListFooter
            itemsLeft={itemsLeft}
            tabProps={tabProps}
            clearCompleted={clearCompleted}
          />
        }
      >
        {todos.map(todo => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </List>
    </div>
  )
}
