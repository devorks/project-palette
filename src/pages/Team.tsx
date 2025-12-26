import { AppHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus, Mail, Phone, MoreHorizontal } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Team() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Team" subtitle={`${mockUsers.length} team members`} />
      
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search team members..." className="pl-9 w-72" />
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Invite Member</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockUsers.map((user) => (
            <Card key={user.id} className="card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className={cn(
                        "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card",
                        user.status === "online" && "bg-status-completed",
                        user.status === "away" && "bg-status-todo",
                        user.status === "busy" && "bg-status-review",
                        user.status === "offline" && "bg-muted"
                      )} />
                    </div>
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
                <Badge variant="secondary" className="mb-3">{user.role}</Badge>
                <div className="flex flex-wrap gap-1 mb-4">
                  {user.skills.map((skill) => <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>)}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1"><Mail className="h-4 w-4 mr-1" />Email</Button>
                  <Button variant="outline" size="sm" className="flex-1"><Phone className="h-4 w-4 mr-1" />Call</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
