import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import type { TodoFormData, TodoFormProps } from "./types"

export default function TodoForm({ editData, onSubmit }: TodoFormProps) {
  const [data, setData] = useState<TodoFormData>({
    title: editData?.title ?? "",
    description: editData?.description ?? "",
    priority: editData?.priority ?? "medium",
    dueDate: editData?.dueDate ?? "",
  })

  const handleChange = (field: keyof TodoFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            id="title"
            value={data.title ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter task title"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            value={data.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="priority">Priority</FieldLabel>
          <Select
            value={data.priority ?? ""}
            onValueChange={(v) =>
              handleChange("priority", v as "low" | "medium" | "high")
            }
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="dueDate">Due Date</FieldLabel>
          <Input
            id="dueDate"
            type="date"
            value={data.dueDate ?? ""}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </Field>
      </FieldGroup>

      <div className="mt-6">
        {/* <Button
          type="button"
          variant="outline"
          onClick={() => handleOpenChange(false)}
        >
          Cancel
        </Button> */}
        <Button type="submit" disabled={!data.title?.trim()}>
          Create Task
        </Button>
      </div>
    </form>
  )
}
