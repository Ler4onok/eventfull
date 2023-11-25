import { IEventCard } from "@/types/interfaces";

export const EventCard = ({ title, startDate, location }: IEventCard) => {
  return (
    <div className="w-[320px] h-[160px] flex align-start justify-center bg-white p-4 rounded shadow">
      <div>{title}</div>
      {/* <div>{startDate}</div> */}
      {/* <div>{location}</div> */}
    </div>
  );
};
