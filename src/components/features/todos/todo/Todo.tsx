import { useState } from "react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TodoProps } from "./types"

export default function Todo({
  id,
  title,
  description,
  completed = false,
  priority = "medium",
  dueDate,
  onToggle,
  onEdit,
  onDelete,
}: TodoProps) {
  const [isCompleted, setIsCompleted] = useState(completed)

  const handleToggle = () => {
    const newCompleted = !isCompleted
    setIsCompleted(newCompleted)
    onToggle?.(id, newCompleted)
  }

  const priorityColors = {
    low: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
    medium: "bg-amber-100 text-amber-700 hover:bg-amber-100",
    high: "bg-red-100 text-red-700 hover:bg-red-100",
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        isCompleted && "opacity-60"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={handleToggle}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <h3
                className={cn(
                  "leading-none font-medium",
                  isCompleted && "text-muted-foreground line-through"
                )}
              >
                {title}
              </h3>
              {description && (
                <p
                  className={cn(
                    "text-sm text-muted-foreground",
                    isCompleted && "line-through"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(id)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className={priorityColors[priority]}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Badge>

          {dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{dueDate}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
