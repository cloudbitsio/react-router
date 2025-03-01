
import { useTodo } from "@/contexts/TodoContext";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { StatusBar } from "@/components/StatusBar";
import { ListSelector } from "@/components/ListSelector";
import { useQuery } from "@tanstack/react-query";

const TodoPage = () => {
  const { getListById, currentListId } = useTodo();
  
  // Use TanStack Query to manage the current list data
  const { data: currentList, isLoading } = useQuery({
    queryKey: ['todoList', currentListId],
    queryFn: () => getListById(currentListId),
    // Since we're using localStorage in the context, this is effectively synchronous
    // but we're using TanStack Query for consistency and future API integration
  });
  
  if (isLoading || !currentList) {
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
