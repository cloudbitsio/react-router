
import { useTodo } from "@/contexts/TodoContext";
import { TodoItem } from "@/components/TodoItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Todo } from "@/types/todo";
import { ClipboardList } from "lucide-react";

interface TodoListProps {
  todos: Todo[];
  emptyMessage?: string;
}

export const TodoList = ({ todos, emptyMessage = "No tasks yet. Add one above!" }: TodoListProps) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground animate-fade-in">
        <ClipboardList className="h-12 w-12 mb-4 opacity-30" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-280px)] pr-3">
      <div className="space-y-1">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
