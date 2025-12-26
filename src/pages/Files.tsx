import { AppHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Upload, Grid, List, FileText, Image, Video, Folder, MoreHorizontal } from "lucide-react";
import { mockFiles } from "@/data/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const iconMap = { document: FileText, pdf: FileText, image: Image, video: Video, folder: Folder };

export default function Files() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Files" subtitle="Manage project files" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search files..." className="pl-9 w-64" /></div>
            <Tabs defaultValue="all"><TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="docs">Documents</TabsTrigger><TabsTrigger value="images">Images</TabsTrigger></TabsList></Tabs>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Grid className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><List className="h-4 w-4" /></Button>
            <Button><Upload className="h-4 w-4 mr-2" />Upload</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockFiles.map((file) => {
            const Icon = iconMap[file.type] || FileText;
            return (
              <Card key={file.id} className="card-hover cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-muted rounded-lg"><Icon className="h-6 w-6 text-primary" /></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.size}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                    <Avatar className="h-5 w-5"><AvatarImage src={file.uploadedBy.avatar} /><AvatarFallback>{file.uploadedBy.name.charAt(0)}</AvatarFallback></Avatar>
                    <span className="text-xs text-muted-foreground">{file.uploadedAt}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
