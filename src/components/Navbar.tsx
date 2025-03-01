
import { Home, BarChart2 } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";

export const Navbar = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="container max-w-md mx-auto">
        <div className="flex items-center justify-around h-16">
          <Link 
            to="/" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors ${
              pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            activeProps={{ className: "text-primary" }}
          >
            <Home className="h-5 w-5 mb-1" />
            <span>Tasks</span>
          </Link>
          
          <Link 
            to="/stats" 
            className={`flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-colors ${
              pathname === "/stats" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            activeProps={{ className: "text-primary" }}
          >
            <BarChart2 className="h-5 w-5 mb-1" />
            <span>Stats</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
