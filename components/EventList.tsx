"use client";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
// import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import { events } from "@/app/events";
import {  useSearchParams } from "next/navigation";

export const EventList = () => {
  // const { events } = useEvents();

  const searchParams = useSearchParams();
  const activeCategories = searchParams.get('categories')?.split(',');

  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
    {/* todo: types */}
      {events.map((event: any) => {
        const eventCategories = event.categories.replace(' ', '').split(',');
        const containsElement = eventCategories.some((category: string) => activeCategories?.includes(category));

        if (activeCategories && !containsElement) {
          return null;
      }
      return <EventCard key={event.id} {...event} />
    })}
    </div>
  );
};
