import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type CompletedState = Record<number, boolean>

const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos'

async function fetchTodos({signal}: {signal?: AbortSignal}): Promise<Todo[]> {
  const response = await fetch(TODOS_URL, { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch todos')
  }

  return response.json()
}

export function TodoList() {
  const [completed, setCompleted] = useState<CompletedState>({})
  
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  const toggleTodo = (id: number) => {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  if (isLoading) {
    return <p>Loading todos...</p>
  }
  
  if (error) {
    return <p>Failed to load todos.</p>
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 border-b border-zinc-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              useEffect fetch example
            </p>
            <h1 className="mt-1 text-2xl font-bold text-zinc-950">
              Todo List
            </h1>
          </div>
          <p className="text-sm text-zinc-500">
            Source: JSONPlaceholder todos
          </p>
        </div>

        {isLoading ? (
          <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            Loading todos...
          </p>
        ) : null}

        {error ? (
          <p className="mt-5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </p>
        ) : null}

        {!isLoading && !error && data.length === 0 ? (
          <p className="mt-5 rounded-md border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            No todos were returned.
          </p>
        ) : null}

        {data.length > 0 ? (
          <ul className="mt-5 max-h-[520px] space-y-3 overflow-y-auto pr-1">
            {data.map((todo) => {
              const todoId = `todo-${todo.id}`

              return (
                <li
                  className="flex items-center rounded-md bg-zinc-100 p-3"
                  key={todo.id}
                >
                  <input
                    checked={completed[todo.id] ?? todo.completed}
                    className="mr-3 h-4 w-4 rounded border-zinc-300 text-teal-700 focus:ring-teal-600"
                    id={todoId}
                    onChange={() => toggleTodo(todo.id)}
                    type="checkbox"
                  />
                  <label
                    className={`flex-1 cursor-pointer text-sm leading-6 text-zinc-800 ${
                      completed[todo.id] ? 'line-through text-zinc-500' : ''
                    }`}
                    htmlFor={todoId}
                  >
                    {todo.title}
                  </label>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default TodoList
