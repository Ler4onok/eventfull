import { IEventCard } from "@/types/interfaces";
import { promises as fs } from "fs";
import { useState } from "react";

export const useEvents = () => {
  const [events, setEvents] = useState<IEventCard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // todo: replace with real fetch
      // mock data
      const file = await fs.readFile(process.cwd() + "/events.json", "utf8");
      const events = JSON.parse(file);

      setEvents(events);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading, error, fetchEvents };
};
