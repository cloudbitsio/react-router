
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClipboardList, BarChart } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const isStatsPage = location.pathname === "/stats";
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 py-4 bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="container max-w-md mx-auto flex justify-center">
        <div className="flex gap-4">
          <Link to="/">
            <Button 
              variant={!isStatsPage ? "default" : "outline"} 
              className="rounded-full px-6"
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              Tasks
            </Button>
          </Link>
          <Link to="/stats">
            <Button 
              variant={isStatsPage ? "default" : "outline"}
              className="rounded-full px-6"
            >
              <BarChart className="h-4 w-4 mr-2" />
              Stats
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
