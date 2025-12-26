import { AppHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { calendarEvents } from "@/data/mockData";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = Array.from({ length: 35 }, (_, i) => i - 3);

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Calendar" subtitle="February 2024" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            <span className="font-semibold ml-2">February 2024</span>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" />Add Event</Button>
        </div>
        <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
          {days.map((day) => <div key={day} className="bg-muted p-3 text-center text-sm font-medium">{day}</div>)}
          {dates.map((date, i) => {
            const d = date + 1;
            const isCurrentMonth = d > 0 && d <= 29;
            const events = calendarEvents.filter((e) => new Date(e.date).getDate() === d);
            return (
              <div key={i} className={`bg-card p-2 min-h-[100px] ${!isCurrentMonth && "opacity-40"}`}>
                <span className={`text-sm ${d === 12 && "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"}`}>
                  {isCurrentMonth ? d : d <= 0 ? 31 + d : d - 29}
                </span>
                {events.slice(0, 2).map((e) => (
                  <div key={e.id} className="mt-1 text-xs p-1 bg-primary/10 text-primary rounded truncate">{e.title}</div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
