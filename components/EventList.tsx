"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";
import { useMemo, useState } from "react";

// todo: add debounce on filters

interface IIsValidProps {
  event: IEventCard;
  activeCategories?: string[];
  activeLocation?: string[];
  activeDate: string | null;
  startDate: Date;
  endDate?: Date;
}

const isValid = ({
  event,
  activeCategories,
  activeLocation,
  activeDate,
  startDate,
  endDate,
}: IIsValidProps) => {
  const containsElement = event.categories?.some((category: string) =>
    activeCategories?.includes(category)
  );
  const containsLocation =
    event.location !== null &&
    activeLocation?.some((location: string) =>
      event.location?.includes(location)
    );

  // todo: into fn
  const eventStartDate = event.startDate && new Date(event.startDate);
  const eventEndDate = event.endDate && new Date(event.endDate);

  eventStartDate?.setHours(0);
  eventStartDate?.setMinutes(0);
  eventStartDate?.setSeconds(0);

  eventEndDate?.setHours(0);
  eventEndDate?.setMinutes(0);
  eventEndDate?.setSeconds(0);

  const isValidEvent =
    eventStartDate &&
    (activeDate === null ||
      (eventStartDate >= startDate &&
        (endDate ? eventStartDate <= endDate : eventStartDate <= startDate)));

  if (
    (activeCategories && !containsElement) ||
    (activeLocation && !containsLocation) ||
    !isValidEvent
  ) {
    return false;
  }
  return true;
};

export const EventList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const activeCategories = useMemo(
    () => searchParams.get("categories")?.split(","),
    [searchParams.get("categories")]
  );
  const activeLocation = useMemo(
    () => searchParams.get("location")?.split(","),
    [searchParams.get("location")]
  );
  const activeDate = useMemo(
    () => searchParams.get("date"),
    [searchParams.get("date")]
  );
  // todo: to fn
  const dates = activeDate?.includes("-")
    ? activeDate.split("-")
    : [activeDate];
  const startDate = dates[0] ? new Date(dates[0] as string) : undefined;
  const endDate = dates.length > 1 ? new Date(dates[1] as string) : undefined;

  const activeFilters = useMemo(
    () => ({
      activeCategories,
      activeLocation,
      activeDate: {
        startDate,
        endDate,
      },
    }),
    [activeCategories, activeLocation, startDate, endDate]
  );

  const { events, totalEvents, fetchMore, loading } = useEvents(activeFilters);
  const [index, setIndex] = useState(1);
  const hasMore = totalEvents !== events.length;

  const fetchMoreEvents = () => {
    hasMore ? setIndex(index + 1) : setIndex(index);

    queryParams.set("page", index.toString());
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });

    fetchMore(activeFilters, index);
  };

  return (
    <>
      {events.length === 0 && !loading && (
        <div className="pt-4">No events found</div>
      )}
      {loading ? (
        <Loader styles={{ container: "pt-8" }} />
      ) : (
        <InfiniteScroll
          dataLength={events.length}
          next={fetchMoreEvents}
          hasMore={hasMore}
          loader={<Loader styles={{ container: "pt-8" }} />}
          className="infinite-scroll-component"
        >
          <>
            {/* <div className="pt-4" >No events found</div> */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
              {/* todo: types */}
              {Array.isArray(events) &&
                events.map((event: any) => {
                  const isValidEvent = isValid({
                    event,
                    activeCategories,
                    activeLocation,
                    activeDate,
                    startDate,
                    endDate,
                  });
                  if (!isValidEvent) {
                    return null;
                  }
                  return <EventCard key={event.id} {...event} />;
                })}
            </div>
          </>
        </InfiniteScroll>
      )}
    </>
  );
};
