import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { GET_TODO_LIST_RESPONSE } from './httpMocks'

const server = setupServer(
  rest.get(`https://dummyjson.com/todos?limit=10`, (_req, res, ctx) => {
    return res(ctx.json(GET_TODO_LIST_RESPONSE))
  }),

  rest.post('https://dummyjson.com/todos/add', async (_req, res, ctx) => {
    return res(ctx.json(GET_TODO_LIST_RESPONSE))
  }),

  rest.put('https://dummyjson.com/todos/:id', async (_req, res, ctx) => {
    return res(ctx.json(GET_TODO_LIST_RESPONSE))
  }),

  rest.delete('https://dummyjson.com/todos/:id', (_req, res, ctx) => {
    return res(ctx.json({ id: 1 }))
  }),
)

export { server }
