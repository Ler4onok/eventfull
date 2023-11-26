import { IEventCard } from "@/types/interfaces";
import Link from "next/link";

export const EventCard = ({ id, title, startDate, location }: IEventCard) => {
  return (
    <Link href={`/events/${id}`}>
      <div className="w-[320px] h-[160px] flex align-start justify-center bg-white p-4 rounded shadow">
        <div>{title}</div>
        {/* <div>{startDate}</div> */}
        {/* <div>{location}</div> */}
      </div>
    </Link>
  );
};
