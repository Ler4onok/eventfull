import { IEventCard } from "@/types/interfaces";
import { promises as fs } from "fs";
import { useEffect, useState } from "react";

export const useEvents = () => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // setLoading(true);
  // try {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/");
      const data = await res.json();
      setEvents(data);
    };

    fetchData();
  }, []);
  // setEvents(events);
  // } catch (err) {
  //   setError(true);
  // } finally {
  //   setLoading(false);
  // }

  return { events, loading, error };
};
