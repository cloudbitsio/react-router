
import { useState, useRef, useEffect } from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoItem = ({ id, title, completed }: TodoItemProps) => {
  const { toggleTodo, removeTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedTitle.trim() !== title) {
      updateTodo(id, editedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item group flex items-center justify-between p-3 mb-2 rounded-xl border border-border bg-white dark:bg-gray-950 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleTodo(id)}
          className="h-5 w-5 rounded-md transition-all duration-300 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
        
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="flex-1 h-8 py-1 px-2 text-sm focus-visible:ring-1"
          />
        ) : (
          <span 
            className={`flex-1 text-sm transition-all duration-200 ${
              completed ? "line-through text-muted-foreground" : ""
            }`}
          >
            {title}
          </span>
        )}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {isEditing ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setEditedTitle(title);
                setIsEditing(false);
              }}
              className="h-7 w-7 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              className="h-7 w-7 rounded-full"
            >
              <Check className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-7 w-7 rounded-full"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => removeTodo(id)}
              className="h-7 w-7 rounded-full text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
