
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { TodoProvider } from "@/contexts/TodoContext";
import { router, queryClient } from "./router";
import { Navbar } from "@/components/Navbar";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TodoProvider>
          <Toaster />
          <Sonner />
          <div className="pb-20 min-h-screen">
            <Outlet />
          </div>
          <Navbar />
        </TodoProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// This is the component that renders the current route
const Outlet = () => {
  return <router.Outlet />;
};

// This is the root component that provides the router
const AppWithProvider = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
