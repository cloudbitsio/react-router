
import { useTodo } from "@/contexts/TodoContext";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { StatusBar } from "@/components/StatusBar";
import { ListSelector } from "@/components/ListSelector";

const TodoPage = () => {
  const { getListById, currentListId } = useTodo();
  const currentList = getListById(currentListId);
  
  if (!currentList) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-display font-bold text-center mb-2">
            Focused
          </h1>
          <p className="text-muted-foreground text-center text-sm">
            A minimalist todo application
          </p>
        </header>
        
        <div className="bg-secondary/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
          <ListSelector />
          <TodoInput />
          <TodoList todos={currentList.todos} />
          <StatusBar />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
