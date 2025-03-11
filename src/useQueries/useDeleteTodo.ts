import { useMutation } from '@tanstack/react-query'
import { deleteTodo } from '../api'

export function useDeleteTodo() {
  return useMutation({
    mutationFn: deleteTodo,
  })
}
