import '@testing-library/jest-dom'
import { server } from './server'
jest.mock('clsx', () => ({
  __esModule: true,
  default: jest.fn((...args) => args.join(' ')),
}))
beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
