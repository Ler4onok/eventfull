"use client";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import {  useSearchParams } from "next/navigation";

export const EventList = () => {
  const { events } = useEvents();

  const searchParams = useSearchParams();
  const activeCategories = searchParams.get('categories')?.split(',');
  const activeLocation = searchParams.get('location')?.split(',');

  // todo: no events found
  // todo: change strategy of filtering
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
    {/* todo: types */}
      {events.map((event: any) => { 
        const containsElement = event.categories.some((category: string) => activeCategories?.includes(category));
        const containsLocation = event.location !== null && activeLocation?.some((location: string) => event.location.includes(location));

        if ((activeCategories && !containsElement) || (activeLocation && !containsLocation)) {
          return null;
      }
      return <EventCard key={event.id} {...event} />
    })}
    </div>
  );
};
