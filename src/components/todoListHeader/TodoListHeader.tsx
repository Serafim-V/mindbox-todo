import { Input } from '../ui/input'

export function TodoListHeader({ addTodo }: { addTodo(e: FormData): void }) {
  return (
    <form action={addTodo} role="form">
      <Input placeholder="What needs to be done?" name="todo" />
    </form>
  )
}
