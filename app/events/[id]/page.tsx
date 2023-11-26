"use client";
import { useParams } from "next/navigation";

const Event = () => {
  const { id } = useParams();
  return <p>Event id: {id}</p>;
};

export default Event;
