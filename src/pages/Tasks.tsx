import { AppHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Search, Filter, Calendar } from "lucide-react";
import { mockTasks, mockProjects } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Tasks() {
  const groupedTasks = {
    today: mockTasks.filter((t) => t.status !== "completed").slice(0, 3),
    thisWeek: mockTasks.filter((t) => t.status !== "completed").slice(3, 6),
    overdue: mockTasks.filter((t) => t.priority === "urgent").slice(0, 2),
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="My Tasks" subtitle={`${mockTasks.length} total tasks`} />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tasks..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" />Filter</Button>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />New Task</Button>
        </div>

        <Tabs defaultValue="list">
          <TabsList><TabsTrigger value="list">List</TabsTrigger><TabsTrigger value="board">Board</TabsTrigger></TabsList>
        </Tabs>

        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([group, tasks]) => (
            <div key={group}>
              <h3 className="font-semibold mb-3 capitalize flex items-center gap-2">
                {group === "today" && "Today"}
                {group === "thisWeek" && "This Week"}
                {group === "overdue" && <span className="text-destructive">Overdue</span>}
                <Badge variant="secondary" className="text-xs">{tasks.length}</Badge>
              </h3>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <Card key={task.id} className="hover:bg-muted/30 transition-colors">
                    <CardContent className="p-4 flex items-center gap-4">
                      <Checkbox />
                      <div className={cn("priority-dot", `priority-${task.priority}`)} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{mockProjects.find((p) => p.id === task.projectId)?.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-wrap gap-1">
                          {task.tags.slice(0, 2).map((tag) => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                        </div>
                        <div className="flex -space-x-1">
                          {task.assignees.slice(0, 2).map((user) => (
                            <Avatar key={user.id} className="h-6 w-6 border-2 border-card">
                              <AvatarImage src={user.avatar} /><AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
