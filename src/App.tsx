import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styles from './App.module.css'
import { TodoList } from './components/todoList'
import { Header } from './components/ui/header'

function App() {
  const queryClient = new QueryClient()

  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <Header title="todos" />
        <TodoList />
      </QueryClientProvider>
    </div>
  )
}

export default App
