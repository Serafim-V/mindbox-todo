import { useQuery } from '@tanstack/react-query'
import { getTodoList } from '../api'
import { TodosResponse } from '../types'

export function useGetTodoList() {
  return useQuery<TodosResponse>({
    queryKey: ['todos'],
    queryFn: getTodoList,
    initialData: { todos: [], total: 0, skip: 0, limit: 0 },
  })
}
