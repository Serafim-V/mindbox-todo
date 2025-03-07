import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTodo } from '../api'

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTodo,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['todos'] })
    // },
  })
}
