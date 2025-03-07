import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const [fakeTodoList, setFakeTodoList] = useState<Todo[]>([])
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
          const newTodo = await addTodoMutateAsync({ todo })
          setFakeTodoList(prev => [newTodo, ...prev])
        } catch (error) {
          console.log('Error', error)
        }
      }
    },
    [addTodoMutateAsync],
  )

  const clearCompleted = useCallback(async () => {
    try {
      const deletedTodo = await Promise.all(
        fakeTodoList
          .filter(todo => todo.completed === true)
          .map(todo => deleteTodo.mutateAsync(String(todo.id))),
      )
      setFakeTodoList(prev =>
        prev.filter(
          todo => !deletedTodo.map(todo => todo.id).includes(todo.id),
        ),
      )
    } catch (error) {
      console.log('Error', error)
    }
  }, [deleteTodo, fakeTodoList])

  useEffect(() => {
    setFakeTodoList(data?.todos || [])
  }, [data?.todos])

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
      return fakeTodoList?.filter((todo: Todo) => todo.completed === false)
    }
    if (tabProps.activeTab === 3) {
      return fakeTodoList?.filter((todo: Todo) => todo.completed === true)
    }

    return fakeTodoList
  }, [fakeTodoList, tabProps.activeTab])

  const itemsLeft = useMemo(() => {
    return data ? data?.total - data?.limit : 0
  }, [data])

  return (
    <>
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
          <TodoListItem todo={todo} />
        ))}
      </List>
    </>
  )
}
