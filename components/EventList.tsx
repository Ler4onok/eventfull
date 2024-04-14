"use client";
export const dynamic = "force-dynamic";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
// types
import type { IEventCard } from "@/types/interfaces";
// hooks
import { useEvents } from "@/hooks/useEvents";
// components
import { EventCard } from "./eventCard/EventCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";

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
  const { events, fetchMore, loading } = useEvents();
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const activeCategories = searchParams.get("categories")?.split(",");
  const activeLocation = searchParams.get("location")?.split(",");
  const activeDate = searchParams.get("date");
  // todo: to fn
  const dates = activeDate?.includes("-")
    ? activeDate.split("-")
    : [activeDate];
  const startDate = new Date(dates[0] as string);
  const endDate = dates.length > 1 ? new Date(dates[1] as string) : undefined;

  // const [items, setItems] = useState<IEventCard[]>([]);
  // const [index, setIndex] = useState(1);
  // const [hasMore, setHasMore] = useState(true);

  // useEffect(() => {
  //   const isLastPage =
  //     events.length - items.length < 20 && events.length !== items.length;
  //   setHasMore(!isLastPage);
  //   setItems(events);
  // }, [events, hasMore, items]);

  // const fetchData = () => {
  //   setIndex(index + 1);

  //   queryParams.set("page", index.toString());
  //   router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });

  //   // if (items.length > events.length) {
  //   //   setHasMore(false);
  //   //   return;
  //   // }
  //   setTimeout(() => {
  //     fetchMore(index);
  //   }, 1000);
  // };

  // todo: no events found
  // todo: change strategy of filtering
  // todo: implement normal pagination
  return (
    <>
      {loading && <Loader />}
      {/* <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
        className="infinite-scroll-component"
      > */}
      <>
        {/* <div className="pt-4" >No events found</div> */}
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-10">
          {/* todo: types */}
          {events.map((event: any) => {
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
      {/* </InfiniteScroll> */}
    </>
  );
};
