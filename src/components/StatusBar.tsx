
import { useTodo } from "@/contexts/TodoContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

export const StatusBar = () => {
  const { currentListId, getTodoCountByStatus, clearCompleted } = useTodo();
  const { completed, active, total } = getTodoCountByStatus(currentListId);

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between py-4 px-2 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="rounded-full">
          {active} active
        </Badge>
        <Badge variant="outline" className="rounded-full">
          {completed} completed
        </Badge>
      </div>
      
      {completed > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => clearCompleted(currentListId)}
          className="text-xs h-8"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Clear completed
        </Button>
      )}
    </div>
  );
};
