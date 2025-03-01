
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoProvider } from "@/contexts/TodoContext";
import TodoPage from "./pages/TodoPage";
import StatsPage from "./pages/StatsPage";
import NotFound from "./pages/NotFound";
import { Navbar } from "@/components/Navbar";

const App = () => (
  <TooltipProvider>
    <TodoProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="pb-20 min-h-screen">
          <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Navbar />
      </BrowserRouter>
    </TodoProvider>
  </TooltipProvider>
);

export default App;
