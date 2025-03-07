import { Button } from '../ui/button'
import { ITabProps, Tab } from '../ui/tab'

export function TodoListFooter({
  itemsLeft,
  tabProps,
  clearCompleted,
}: {
  itemsLeft: number
  tabProps: ITabProps
  clearCompleted(): void
}) {
  return (
    <>
      <div className="todo-count">{itemsLeft} items left</div>
      <Tab {...tabProps} />
      <Button onClick={clearCompleted}>Clear completed</Button>
    </>
  )
}
