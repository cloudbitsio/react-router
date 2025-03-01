
import { useState } from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, ListPlus, Edit, Trash2 } from "lucide-react";

export const ListSelector = () => {
  const { 
    lists, 
    currentListId, 
    setCurrentListId, 
    addList, 
    removeList, 
    updateListName,
    getTodoCountByStatus
  } = useTodo();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [editListName, setEditListName] = useState("");
  
  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName);
      setNewListName("");
      setIsCreateDialogOpen(false);
    }
  };
  
  const handleUpdateList = () => {
    if (editListName.trim()) {
      updateListName(currentListId, editListName);
      setEditListName("");
      setIsEditDialogOpen(false);
    }
  };
  
  const handleDeleteList = () => {
    removeList(currentListId);
  };
  
  const currentList = lists.find(list => list.id === currentListId);
  const counts = getTodoCountByStatus(currentListId);

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex-1">
        <Select value={currentListId} onValueChange={setCurrentListId}>
          <SelectTrigger className="bg-white dark:bg-gray-950 h-12 shadow-sm border border-border">
            <SelectValue placeholder="Select a list" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {lists.map((list) => (
                <SelectItem key={list.id} value={list.id} className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>{list.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {getTodoCountByStatus(list.id).total}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      {/* Create List Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="h-12 w-12 bg-white dark:bg-gray-950 shadow-sm border border-border"
          >
            <ListPlus className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new list</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="bg-white dark:bg-gray-950"
              onKeyDown={(e) => e.key === "Enter" && handleAddList()}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddList}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit List Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="h-12 w-12 bg-white dark:bg-gray-950 shadow-sm border border-border"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit list</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="List name"
              value={editListName || (currentList ? currentList.name : "")}
              onChange={(e) => setEditListName(e.target.value)}
              className="bg-white dark:bg-gray-950"
              onKeyDown={(e) => e.key === "Enter" && handleUpdateList()}
            />
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <Button 
              variant="destructive" 
              onClick={handleDeleteList}
              className="mr-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete List
            </Button>
            <div>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleUpdateList}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
