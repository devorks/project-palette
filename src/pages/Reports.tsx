import { AppHeader } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, CheckSquare, FolderKanban, Download, Calendar } from "lucide-react";
import { dashboardStats, mockProjects } from "@/data/mockData";

const stats = [
  { label: "Total Tasks Completed", value: "156", change: "+12%", icon: CheckSquare },
  { label: "Active Projects", value: "8", change: "+2", icon: FolderKanban },
  { label: "Team Velocity", value: "24/week", change: "+8%", icon: TrendingUp },
  { label: "Team Members", value: "12", change: "+3", icon: Users },
];

export default function Reports() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Reports & Analytics" subtitle="Track your team's performance" />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Tabs defaultValue="overview"><TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="projects">Projects</TabsTrigger><TabsTrigger value="team">Team</TabsTrigger></TabsList></Tabs>
          <div className="flex gap-2">
            <Button variant="outline"><Calendar className="h-4 w-4 mr-2" />Last 30 days</Button>
            <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-status-completed mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-xl"><stat.icon className="h-5 w-5 text-primary" /></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Tasks by Status</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(dashboardStats.tasksByStatus).map(([status, count]) => (
                <div key={status} className="space-y-2">
                  <div className="flex justify-between text-sm"><span className="capitalize">{status.replace(/([A-Z])/g, ' $1')}</span><span>{count}</span></div>
                  <Progress value={(count / 49) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Project Progress</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {mockProjects.slice(0, 4).map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between text-sm"><span>{project.emoji} {project.name}</span><span>{project.progress}%</span></div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
