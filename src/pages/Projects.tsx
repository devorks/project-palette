import { AppHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MoreHorizontal, Calendar, Users } from "lucide-react";
import { mockProjects, mockTasks } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusColumns = [
  { id: "todo", label: "TO DO", color: "status-todo" },
  { id: "in-progress", label: "IN PROGRESS", color: "status-progress" },
  { id: "in-review", label: "IN REVIEW", color: "status-review" },
  { id: "completed", label: "COMPLETED", color: "status-completed" },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const navigate = useNavigate();
  const projectTasks = mockTasks.filter((t) => t.projectId === selectedProject.id);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Projects" subtitle={`${mockProjects.length} active projects`} />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Project Sidebar */}
        <aside className="w-72 border-r border-border p-4 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects..." className="pl-9 h-9" />
            </div>
            <Button size="icon" className="h-9 w-9"><Plus className="h-4 w-4" /></Button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full"><TabsTrigger value="active" className="flex-1">Active</TabsTrigger><TabsTrigger value="all" className="flex-1">All</TabsTrigger></TabsList>
          </Tabs>

          <div className="space-y-2">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors",
                  selectedProject.id === project.id ? "bg-sidebar-accent" : "hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{project.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.tasksCount} tasks</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Kanban Board */}
        <main className="flex-1 p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedProject.emoji}</span>
              <div>
                <h2 className="text-xl font-semibold">{selectedProject.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {selectedProject.members.slice(0, 4).map((user) => (
                  <Avatar key={user.id} className="h-8 w-8 border-2 border-card">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" />Add Task</Button>
            </div>
          </div>

          <div className="flex gap-4 min-w-max">
            {statusColumns.map((column) => {
              const columnTasks = projectTasks.filter((t) => t.status === column.id);
              return (
                <div key={column.id} className="w-72 flex-shrink-0">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={cn("status-badge", column.color)}>{column.label}</Badge>
                    <span className="text-sm text-muted-foreground">{columnTasks.length}</span>
                  </div>
                  <div className="space-y-3">
                    {columnTasks.map((task) => (
                      <Card key={task.id} className="card-hover cursor-pointer">
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-sm">{task.title}</p>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-1">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {task.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <div className="flex -space-x-1">
                              {task.assignees.slice(0, 2).map((user) => (
                                <Avatar key={user.id} className="h-6 w-6 border-2 border-card">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                      <Plus className="h-4 w-4 mr-2" />Add task
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
