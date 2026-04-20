import type { Todo as TodoT } from "@/types"
import { useEffect, useState } from "react"
import { Todo } from "@/components/features/todos/todo"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import TodoForm from "../todo-form/TodoForm"

export default function TodoList() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [todos, setTodos] = useState<TodoT[]>([])
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null)

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")

    if (storedTodos) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTodos(JSON.parse(storedTodos) as TodoT[])
    }
  }, [])

  const handleAddTodo = (data: Omit<TodoT, "id" | "completed">) => {
    let newTodos: TodoT[] = []
    if (editingTodoId) {
      newTodos = todos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, ...data } : todo
      )
    } else {
      newTodos = [
        {
          id: Date.now(),
          completed: false,
          ...data,
        },
        ...todos,
      ]
    }

    localStorage.setItem("todos", JSON.stringify(newTodos))

    setTodos(newTodos)
    setIsModalOpen(false)
    setEditingTodoId(null)
  }

  const handleToggleTodo = (id: number, completed: boolean) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    )
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(newTodos))
    setTodos(newTodos)
  }

  const handleEditTodo = (id: number) => {
    setIsModalOpen(true)
    setEditingTodoId(id)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingTodoId(null)
  }

  return (
    <div className="m-auto flex max-w-7xl flex-col gap-5 py-5">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
          onEdit={handleEditTodo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      ))}

      <div className="flex justify-end">
        <Button
          variant="outline"
          className="mt-10"
          onClick={() => setIsModalOpen(true)}
        >
          Add Todo
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={handleModalClose}>
        <DialogContent>
          <TodoForm
            editData={todos.find((todo) => todo.id === editingTodoId)}
            onSubmit={handleAddTodo}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
