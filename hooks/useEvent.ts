import { useEffect, useState } from "react";

// todo: remove because unnesesary due to SSR
export const useEvent = (id: string | string[]) => {
  // todo: add event type
  const [event, setEvent] = useState({} as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async (eventId: number) => {
      const res = await fetch(`/api/events/${eventId}`);
      const event = await res.json();
      setLoading(false);
      setEvent(event);
    };

    getEvent(Number(id));
  }, [id]);

  return { event, loading };
};
