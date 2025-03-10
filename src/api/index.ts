import axios from 'axios'
import { Todo } from '../types'

export async function getTodoList() {
  return axios
    .get('https://dummyjson.com/todos?limit=10')
    .then(({ data }) => data)
}

export async function updateTodo({
  completed,
  id,
}: {
  completed: boolean
  id: string
}) {
  return axios
    .put('https://dummyjson.com/todos/' + id, {
      completed,
    })
    .then(({ data }) => data)
}

export async function deleteTodo(id: string) {
  return axios
    .delete<Todo>('https://dummyjson.com/todos/' + id)
    .then(({ data }) => data)
}

export async function addTodo(todo: Pick<Todo, 'todo'>) {
  return axios
    .post<Todo>('https://dummyjson.com/todos/add', {
      ...todo,
      userId: 1,
    })
    .then(({ data }) => data)
}
