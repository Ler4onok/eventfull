// types
import type { IEventCard } from "@/types/interfaces";
// hooks
// import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./EventCard";
import { promises as fs } from "fs";

export const EventList = async () => {
  // const { events } = useEvents();
  // mock data
  const file = await fs.readFile(process.cwd() + "/events.json", "utf8");
  const events = JSON.parse(file);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {events.map((event: IEventCard) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
