
import { useState, KeyboardEvent } from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const TodoInput = () => {
  const { addTodo } = useTodo();
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo(title);
      setTitle("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <Input
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 h-12 shadow-sm bg-white dark:bg-gray-950 border border-border"
      />
      <Button 
        onClick={handleAddTodo} 
        className="h-12 px-4"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add
      </Button>
    </div>
  );
};
