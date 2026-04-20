import type { Todo } from "@/types"

export interface TodoFormData {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
}

export interface TodoFormProps {
  editData?: Todo
  onSubmit: (data: TodoFormData) => void
}
