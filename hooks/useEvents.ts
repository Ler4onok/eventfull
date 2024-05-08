import { IEventCard } from "@/types/interfaces";
import { useEffect, useState } from "react";

// remove due to SSR
export const useEvents = () => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

 
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/");
      const {events, categories} = await res.json();
      setLoading(false);
      setEvents(events);
      setCategories(categories);
    };

    fetchData();
  }, []);

  const fetchMore = async (page: number) => {
    const res = await fetch(`/api/?page=${page}`);
    const data = await res.json();
    setEvents([...events, ...data]);
  }
  // setEvents(events);
  // } catch (err) {
  //   setError(true);
  // } finally {
  //   setLoading(false);
  // }

  return { events, categories, loading, error, fetchMore };
};
