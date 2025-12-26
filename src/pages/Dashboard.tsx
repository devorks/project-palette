import { AppHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban,
  CheckSquare,
  Clock,
  Users,
  TrendingUp,
  ArrowUpRight,
  MoreHorizontal,
  Plus,
  Calendar,
  MessageSquare,
  FileText,
  ArrowRight,
} from "lucide-react";
import {
  mockProjects,
  mockTasks,
  mockActivities,
  mockUsers,
  dashboardStats,
  currentUser,
  calendarEvents,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

const statCards = [
  {
    title: "Active Projects",
    value: dashboardStats.activeProjects,
    icon: FolderKanban,
    change: "+2 this month",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Tasks Due Today",
    value: dashboardStats.tasksDueToday,
    icon: CheckSquare,
    change: "3 urgent",
    color: "text-status-review",
    bgColor: "bg-status-review-bg",
  },
  {
    title: "Pending Reviews",
    value: dashboardStats.pendingReviews,
    icon: Clock,
    change: "2 awaiting you",
    color: "text-status-todo",
    bgColor: "bg-status-todo-bg",
  },
  {
    title: "Team Online",
    value: dashboardStats.teamOnline,
    icon: Users,
    change: `of ${mockUsers.length} members`,
    color: "text-status-completed",
    bgColor: "bg-status-completed-bg",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "todo":
      return "status-todo";
    case "in-progress":
      return "status-progress";
    case "in-review":
      return "status-review";
    case "completed":
      return "status-completed";
    default:
      return "";
  }
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "low":
      return "priority-low";
    case "medium":
      return "priority-medium";
    case "high":
      return "priority-high";
    case "urgent":
      return "priority-urgent";
    default:
      return "";
  }
};

export default function Dashboard() {
  const todayTasks = mockTasks.filter((t) => t.status !== "completed").slice(0, 5);
  const recentProjects = mockProjects.filter((p) => p.status === "active").slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        title={`Good morning, ${currentUser.name.split(" ")[0]}!`}
        subtitle="Here's what's happening with your projects today"
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title} className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <stat.icon className={cn("h-5 w-5", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Tasks Today */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">My Tasks Today</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  <div className={cn("priority-dot flex-shrink-0", getPriorityClass(task.priority))} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate group-hover:text-primary transition-colors">
                      {task.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {mockProjects.find((p) => p.id === task.projectId)?.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={cn("status-badge", getStatusClass(task.status))}>
                      {task.status.replace("-", " ")}
                    </Badge>
                    <div className="flex -space-x-2">
                      {task.assignees.slice(0, 2).map((user) => (
                        <Avatar key={user.id} className="h-7 w-7 border-2 border-card">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {calendarEvents.slice(0, 4).map((event) => (
                <div key={event.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 text-center">
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-semibold">
                      {new Date(event.date).getDate()}
                    </p>
                  </div>
                  <div className="flex-1 border-l border-border pl-3">
                    <p className="font-medium">{event.title}</p>
                    {event.time && (
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Project Progress */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Project Progress</CardTitle>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Project
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="space-y-3 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{project.emoji}</span>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {project.completedTasks} of {project.tasksCount} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((user) => (
                          <Avatar key={user.id} className="h-7 w-7 border-2 border-card">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members.length > 3 && (
                          <div className="h-7 w-7 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                            +{project.members.length - 3}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name.split(" ")[0]}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Team Status */}
        <Card>
          <CardHeader className="flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Team Status</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Manage team
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer min-w-[200px]"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                        user.status === "online" && "bg-status-completed",
                        user.status === "away" && "bg-status-todo",
                        user.status === "busy" && "bg-status-review",
                        user.status === "offline" && "bg-muted"
                      )}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
