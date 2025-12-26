import { AppHeader } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { currentUser } from "@/data/mockData";
import { Camera } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Settings" subtitle="Manage your account and preferences" />
      
      <div className="p-6 max-w-4xl">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Profile Information</CardTitle><CardDescription>Update your profile details</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="h-20 w-20"><AvatarImage src={currentUser.avatar} /><AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback></Avatar>
                    <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full"><Camera className="h-4 w-4" /></Button>
                  </div>
                  <div><p className="font-semibold">{currentUser.name}</p><p className="text-sm text-muted-foreground">{currentUser.email}</p></div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>First name</Label><Input defaultValue={currentUser.name.split(" ")[0]} /></div>
                  <div className="space-y-2"><Label>Last name</Label><Input defaultValue={currentUser.name.split(" ")[1]} /></div>
                  <div className="space-y-2 col-span-2"><Label>Email</Label><Input type="email" defaultValue={currentUser.email} /></div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {["Email notifications", "Push notifications", "Task reminders", "Weekly digest"].map((item) => (
                  <div key={item} className="flex items-center justify-between"><Label>{item}</Label><Switch defaultChecked /></div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
