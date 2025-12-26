import { AppHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Smile, Paperclip, Hash, Plus, Search } from "lucide-react";
import { mockMessages, mockUsers, mockProjects } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

const channels = [
  { id: "1", name: "general", unread: 0 },
  { id: "2", name: "website-redesign", unread: 3 },
  { id: "3", name: "mobile-app", unread: 0 },
  { id: "4", name: "marketing", unread: 1 },
];

export default function Messages() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Messages" />
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-64 border-r border-border p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search..." className="pl-9 h-9" /></div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><span className="text-xs font-semibold text-muted-foreground uppercase">Channels</span><Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="h-4 w-4" /></Button></div>
            {channels.map((ch) => (
              <div key={ch.id} onClick={() => setSelectedChannel(ch)} className={cn("flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer", selectedChannel.id === ch.id ? "bg-sidebar-accent" : "hover:bg-muted")}>
                <Hash className="h-4 w-4 text-muted-foreground" /><span className="flex-1">{ch.name}</span>
                {ch.unread > 0 && <Badge className="h-5 w-5 p-0 flex items-center justify-center text-xs">{ch.unread}</Badge>}
              </div>
            ))}
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Direct Messages</span>
            {mockUsers.slice(0, 4).map((user) => (
              <div key={user.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted cursor-pointer">
                <div className="relative"><Avatar className="h-6 w-6"><AvatarImage src={user.avatar} /><AvatarFallback>{user.name.charAt(0)}</AvatarFallback></Avatar>
                <span className={cn("absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-card", user.status === "online" ? "bg-status-completed" : "bg-muted")} /></div>
                <span className="text-sm">{user.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="border-b border-border px-4 py-3 flex items-center gap-2"><Hash className="h-5 w-5" /><span className="font-semibold">{selectedChannel.name}</span></div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {mockMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="h-9 w-9"><AvatarImage src={msg.user.avatar} /><AvatarFallback>{msg.user.name.charAt(0)}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><span className="font-semibold text-sm">{msg.user.name}</span><span className="text-xs text-muted-foreground">{msg.timestamp}</span></div>
                  <p className="text-sm mt-1">{msg.content}</p>
                  {msg.reactions.length > 0 && <div className="flex gap-1 mt-2">{msg.reactions.map((r, i) => <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded-full">{r.emoji} {r.count}</span>)}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
              <Input placeholder={`Message #${selectedChannel.name}`} className="flex-1" />
              <Button variant="ghost" size="icon"><Smile className="h-4 w-4" /></Button>
              <Button size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
