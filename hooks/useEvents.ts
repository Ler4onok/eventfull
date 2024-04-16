import { IEventCard } from "@/types/interfaces";
import { useEffect, useRef, useState } from "react";

export const useEvents = () => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const totalEventsRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/");
      const data = await res.json();

      setLoading(false);

      totalEventsRef.current = data.totalEvents;
      setEvents(data.events);
    };

    fetchData();
  }, []);

  const fetchMore = async (page: number) => {
    const res = await fetch(`/api/?page=${page}`);
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
