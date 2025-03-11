import axios from 'axios'
import { Todo } from '../types'

const axiosInstans = axios.create({
  baseURL: 'https://dummyjson.com',
})

export async function getTodoList() {
  return axiosInstans
    .get('/todos', {
      params: {
        limit: 10,
      },
    })
    .then(({ data }) => data)
}

export async function updateTodo({
  completed,
  id,
}: {
  completed: boolean
  id: string
}) {
  return axiosInstans
    .put('/todos/' + id, {
      completed,
    })
    .then(({ data }) => data)
}

export async function deleteTodo(id: string) {
  return axiosInstans.delete<Todo>('/todos/' + id).then(({ data }) => data)
}

export async function addTodo(todo: Pick<Todo, 'todo'>) {
  return axiosInstans
    .post<Todo>('/todos/add', {
      ...todo,
      userId: 1,
    })
    .then(({ data }) => data)
}
