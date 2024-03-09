"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";

export const EventList = () => {
  const { events } = useEvents();

  const searchParams = useSearchParams();
  const activeCategories = searchParams.get("categories")?.split(",");
  const activeLocation = searchParams.get("location")?.split(",");

  const [items, setItems] = useState<IEventCard[]>([]); 
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setItems(events.slice(0, 20));
  }, [events])

  const fetchMoreData = () => {
    if (items.length >= events.length) {
      setHasMore(false);
      return;
    }
    // Simulating a delay in fetching more data
    setTimeout(() => {
      setItems(items.concat(events.slice(items.length, items.length + 20)));
    }, 1000);
  };

  // todo: no events found
  // todo: change strategy of filtering
  // todo: implement normal pagination
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Loader />}
      className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10"
    >
        {/* todo: types */}
        {items.map((event: any) => {
          const containsElement = event.categories.some((category: string) =>
            activeCategories?.includes(category)
          );
          const containsLocation =
            event.location !== null &&
            activeLocation?.some((location: string) =>
              event.location.includes(location)
            );

          if (
            (activeCategories && !containsElement) ||
            (activeLocation && !containsLocation)
          ) {
            return null;
          }
          return <EventCard key={event.id} {...event} />;
        })}
    </InfiniteScroll>
  );
};
