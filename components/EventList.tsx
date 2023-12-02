// types
import type { IEventCard } from "@/types/interfaces";
// hooks
// import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import { promises as fs } from "fs";

export const EventList = async () => {
  // const { events } = useEvents();
  // mock data
  const file = await fs.readFile(process.cwd() + "/events.json", "utf8");
  const events = JSON.parse(file);

  return (
    // todo: change to grid
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
      {events.map((event: IEventCard) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
