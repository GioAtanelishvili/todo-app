export interface TodoProps {
  id: number
  title: string
  description?: string
  completed?: boolean
  priority?: "low" | "medium" | "high"
  dueDate?: string
  onToggle?: (id: number, completed: boolean) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}
