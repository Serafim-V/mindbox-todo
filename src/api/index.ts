import { Todo } from '../types'

async function resposeHandler(res: Response) {
  if (res.status >= 400) {
    throw await res.json()
  }

  return res.json()
}

export async function getTodoList() {
  return fetch('https://dummyjson.com/todos?limit=10').then(res => res.json())
}

export async function updateTodo({
  completed,
  id,
}: {
  completed: boolean
  id: string
}) {
  return fetch('https://dummyjson.com/todos/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      completed,
    }),
  }).then(resposeHandler)
}

export async function deleteTodo(id: string) {
  return fetch('https://dummyjson.com/todos/' + id, {
    method: 'DELETE',
  }).then(resposeHandler)
}

export async function addTodo(todo: Pick<Todo, 'todo'>) {
  return fetch('https://dummyjson.com/todos/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...todo,
      userId: 1,
    }),
  }).then(resposeHandler)
}
