import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <main
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-[72px]" : "ml-64"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}
