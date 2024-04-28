import { IEventCard } from "@/types/interfaces";
import { useEffect, useRef, useState } from "react";

export const useEvents = (filters) => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const totalEventsRef = useRef();

  useEffect(() => {
    const fetchData = async (activeFilters) => {
      setLoading(true);
      const categories = activeFilters.activeCategories;
      const location = activeFilters.activeLocation;
      // todo: process date
      const date = undefined;
      // JSON.stringify(activeFilters.activeDate);

      const res = await fetch(
        `/api/?${categories ? `&categories=${categories}` : ""}${
          location ? `&location=${location}` : ""
        }${date ? `&date=${date}` : ""}`
      );

      const data = await res.json();

      setLoading(false);

      totalEventsRef.current = data.totalEvents;
      setEvents(data.events);
    };

    fetchData(filters);
  }, [filters]);

  const fetchMore = async (activeFilters, page: number) => {
    const categories = activeFilters.activeCategories;
    const location = activeFilters.activeLocation;
    const date = undefined;

    const isFiltersApplied = categories || location || date;

    const res = await fetch(
      `/api/${categories ? `?categories=${categories}` : ""}${
        location ? `&location=${location}` : ""
      }${date ? `&date=${date}` : ""}${
        page ? `${isFiltersApplied ? "" : "?"}&page=${page}` : ""
      }`
    );

    const data = await res.json();
    setEvents([...events, ...data.events]);
  };
  // setEvents(events);
  // } catch (err) {
  //   setError(true);
  // } finally {
  //   setLoading(false);
  // }

  return {
    events,
    totalEvents: totalEventsRef.current,
    loading,
    error,
    fetchMore,
  };
};
