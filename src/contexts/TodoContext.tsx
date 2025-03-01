
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Todo, TodoList } from "@/types/todo";

interface TodoContextType {
  lists: TodoList[];
  currentListId: string;
  setCurrentListId: (id: string) => void;
  addList: (name: string) => void;
  removeList: (id: string) => void;
  updateListName: (id: string, name: string) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
  getListById: (id: string) => TodoList | undefined;
  getTodoCountByStatus: (listId: string) => { completed: number; active: number; total: number };
  clearCompleted: (listId: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<TodoList[]>(() => {
    const savedLists = localStorage.getItem("todoLists");
    if (savedLists) {
      try {
        const parsedLists = JSON.parse(savedLists);
        // Convert string dates back to Date objects
        return parsedLists.map((list: any) => ({
          ...list,
          createdAt: new Date(list.createdAt),
          todos: list.todos.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
          }))
        }));
      } catch (error) {
        console.error("Failed to parse saved lists", error);
        return [];
      }
    }
    
    // Default list if none exists
    return [{
      id: uuidv4(),
      name: "My Tasks",
      todos: [],
      createdAt: new Date()
    }];
  });
  
  const [currentListId, setCurrentListId] = useState<string>(() => {
    const savedCurrentListId = localStorage.getItem("currentListId");
    if (savedCurrentListId) return savedCurrentListId;
    return lists[0]?.id || "";
  });

  // Save to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(lists));
  }, [lists]);
  
  // Save current list id to localStorage
  useEffect(() => {
    localStorage.setItem("currentListId", currentListId);
  }, [currentListId]);

  const getListById = (id: string) => {
    return lists.find(list => list.id === id);
  };
  
  const addList = (name: string) => {
    const newList: TodoList = {
      id: uuidv4(),
      name,
      todos: [],
      createdAt: new Date()
    };
    
    setLists(prev => [...prev, newList]);
    setCurrentListId(newList.id);
    toast.success(`List "${name}" created`);
  };
  
  const removeList = (id: string) => {
    const listToRemove = getListById(id);
    if (!listToRemove) return;
    
    setLists(prev => prev.filter(list => list.id !== id));
    
    // If we're removing the current list, switch to another one
    if (id === currentListId) {
      const remainingLists = lists.filter(list => list.id !== id);
      if (remainingLists.length > 0) {
        setCurrentListId(remainingLists[0].id);
      } else {
        // Create a new default list if this was the last one
        const newList: TodoList = {
          id: uuidv4(),
          name: "My Tasks",
          todos: [],
          createdAt: new Date()
        };
        setLists([newList]);
        setCurrentListId(newList.id);
      }
    }
    
    toast.success(`List "${listToRemove.name}" removed`);
  };
  
  const updateListName = (id: string, name: string) => {
    setLists(prev => 
      prev.map(list => 
        list.id === id 
          ? { ...list, name } 
          : list
      )
    );
    toast.success("List name updated");
  };

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: uuidv4(),
      title,
      completed: false,
      createdAt: new Date()
    };
    
    setLists(prev => 
      prev.map(list => 
        list.id === currentListId 
          ? { ...list, todos: [newTodo, ...list.todos] } 
          : list
      )
    );
    
    toast.success("Task added");
  };

  const toggleTodo = (id: string) => {
    setLists(prev => 
      prev.map(list => 
        list.id === currentListId 
          ? { 
              ...list, 
              todos: list.todos.map(todo => 
                todo.id === id 
                  ? { ...todo, completed: !todo.completed } 
                  : todo
              ) 
            } 
          : list
      )
    );
  };

  const removeTodo = (id: string) => {
    setLists(prev => 
      prev.map(list => 
        list.id === currentListId 
          ? { ...list, todos: list.todos.filter(todo => todo.id !== id) } 
          : list
      )
    );
    
    toast.success("Task removed");
  };

  const updateTodo = (id: string, title: string) => {
    if (!title.trim()) return;
    
    setLists(prev => 
      prev.map(list => 
        list.id === currentListId 
          ? { 
              ...list, 
              todos: list.todos.map(todo => 
                todo.id === id 
                  ? { ...todo, title } 
                  : todo
              ) 
            } 
          : list
      )
    );
    
    toast.success("Task updated");
  };
  
  const getTodoCountByStatus = (listId: string) => {
    const list = getListById(listId);
    if (!list) return { completed: 0, active: 0, total: 0 };
    
    const completed = list.todos.filter(todo => todo.completed).length;
    const total = list.todos.length;
    
    return {
      completed,
      active: total - completed,
      total
    };
  };
  
  const clearCompleted = (listId: string) => {
    const list = getListById(listId);
    if (!list) return;
    
    const completedCount = list.todos.filter(todo => todo.completed).length;
    
    if (completedCount === 0) {
      toast.info("No completed tasks to clear");
      return;
    }
    
    setLists(prev => 
      prev.map(list => 
        list.id === listId 
          ? { ...list, todos: list.todos.filter(todo => !todo.completed) } 
          : list
      )
    );
    
    toast.success(`Cleared ${completedCount} completed tasks`);
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        currentListId,
        setCurrentListId,
        addList,
        removeList,
        updateListName,
        addTodo,
        toggleTodo,
        removeTodo,
        updateTodo,
        getListById,
        getTodoCountByStatus,
        clearCompleted
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
