"use client";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
// import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import { events } from "@/app/events";

export const EventList = () => {
  // const { events } = useEvents();

  return (
    // todo: change to grid
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
      {events.map((event: IEventCard) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
