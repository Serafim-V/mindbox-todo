import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { rest } from 'msw'
import App from '../App.tsx'
import {
  getChangedTodoListResponse,
  getDeletedTodoListResponse,
} from './httpMocks.ts'
import { server } from './server.ts'

describe('Testing TODOS', () => {
  test('Get todos and set done todo', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get')
    const spyAxiosPut = jest.spyOn(axios, 'put')

    render(<App />)

    await screen.findByText('todos')
    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/todos?limit=10',
      )
    })
    server.use(
      rest.get(`https://dummyjson.com/todos?limit=10`, (_req, res, ctx) => {
        return res(ctx.json(getChangedTodoListResponse()))
      }),
    )
    const todo = await screen.findByLabelText(
      'Do something nice for someone you care about',
    )
    expect(todo).not.toBeChecked()

    await waitFor(() => fireEvent.click(todo))
    await waitFor(() => {
      expect(spyAxiosPut).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/1',
        { completed: true },
      )
    })

    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenNthCalledWith(
        2,
        'https://dummyjson.com/todos?limit=10',
      )
    })

    expect(
      await screen.findByLabelText(
        'Do something nice for someone you care about',
      ),
    ).toBeChecked()
  })

  test('Delete Todos', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get')
    const spyAxiosDelete = jest.spyOn(axios, 'delete')

    render(<App />)

    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/todos?limit=10',
      )
    })

    server.use(
      rest.get(`https://dummyjson.com/todos?limit=10`, (_req, res, ctx) => {
        return res(ctx.json(getDeletedTodoListResponse()))
      }),
    )
    expect((await screen.findAllByRole('listitem')).length).toEqual(10)
    await waitFor(async () =>
      fireEvent.click(await screen.findByText('Clear completed')),
    )

    await waitFor(async () => {
      expect(spyAxiosDelete).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/2',
      )
    })

    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenNthCalledWith(
        2,
        'https://dummyjson.com/todos?limit=10',
      )
    })
    await screen.findAllByRole('listitem')
    expect((await screen.findAllByRole('listitem')).length).toEqual(5)
  })

  test('Add Todo', async () => {
    const spyAxiosGet = jest.spyOn(axios, 'get')
    const spyAxiosPost = jest.spyOn(axios, 'post')

    render(<App />)

    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenCalledWith(
        'https://dummyjson.com/todos?limit=10',
      )
    })

    const input = screen.getByPlaceholderText('What needs to be done?')
    fireEvent.change(input, { target: { value: 'New todo' } })
    const form = screen.getByRole('form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(spyAxiosPost).toHaveBeenCalledWith(
        'https://dummyjson.com/todos/add',
        {
          todo: 'New todo',
          userId: 1,
        },
      )
    })

    await waitFor(() => {
      expect(spyAxiosGet).toHaveBeenNthCalledWith(
        2,
        'https://dummyjson.com/todos?limit=10',
      )
    })
  })
})
