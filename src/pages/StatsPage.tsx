
import { useTodo } from "@/contexts/TodoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { CheckCircle, Circle, BarChart as BarChartIcon, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StatsPage = () => {
  const { lists, getTodoCountByStatus } = useTodo();
  
  const totalTasks = lists.reduce((acc, list) => acc + list.todos.length, 0);
  const completedTasks = lists.reduce((acc, list) => {
    return acc + list.todos.filter(todo => todo.completed).length;
  }, 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const pieData = [
    { name: "Completed", value: completedTasks, color: "hsl(var(--primary))" },
    { name: "Active", value: totalTasks - completedTasks, color: "hsl(var(--muted))" }
  ];
  
  const barData = lists.map(list => {
    const { completed, active, total } = getTodoCountByStatus(list.id);
    return {
      name: list.name,
      completed,
      active,
      total
    };
  });
  
  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">Statistics</h1>
            <p className="text-muted-foreground text-sm">
              Overview of your productivity
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="h-10">
              <ClipboardList className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </Link>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total Tasks</CardDescription>
              <CardTitle className="text-3xl font-display">{totalTasks}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <ClipboardList className="h-4 w-4 mr-1 text-primary" />
                Across all lists
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Completion Rate</CardDescription>
              <CardTitle className="text-3xl font-display">{completionRate}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={completionRate} className="h-2 mb-2" />
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-1 text-primary" />
                {completedTasks} of {totalTasks} tasks completed
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Lists</CardDescription>
              <CardTitle className="text-3xl font-display">{lists.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <BarChartIcon className="h-4 w-4 mr-1 text-primary" />
                {lists.filter(list => list.todos.length > 0).length} with tasks
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border border-border shadow-sm">
            <CardHeader>
              <CardTitle>Task Completion</CardTitle>
              <CardDescription>
                Distribution of completed vs active tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="h-[250px] w-full max-w-[250px]">
                {totalTasks > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No data to display
                  </div>
                )}
              </div>
              {totalTasks > 0 && (
                <div className="flex flex-col justify-center ml-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">
                      Completed ({completedTasks})
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-muted mr-2"></div>
                    <span className="text-sm">
                      Active ({totalTasks - completedTasks})
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border border-border shadow-sm">
            <CardHeader>
              <CardTitle>Tasks By List</CardTitle>
              <CardDescription>
                Distribution of tasks across your lists
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                {barData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" name="Completed" fill="hsl(var(--primary))" />
                      <Bar dataKey="active" name="Active" fill="hsl(var(--muted))" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No data to display
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
