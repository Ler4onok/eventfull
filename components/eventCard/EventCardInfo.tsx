import { IEventCard } from "@/types/interfaces";
// icons
import { FaCalendarAlt as CalendarIcon } from "react-icons/fa";
import { IoMdPricetag as PriceIcon } from "react-icons/io";

type TEventCardInfo = Partial<IEventCard> & { date: string };

export const EventCardInfo = ({
  title,
  date,
  price = "Free",
}: TEventCardInfo) => {
  return (
    <div className="py-4">
      <div className="text-sm font-bold text-xl h-14">{title}</div>
      <div className="flex items-center justify-between">
        {/* todo: new component or map to get rid of duplication */}
        {date && (
          <div className="flex items-center justify-between gap-2">
            {/* todo: create global variable color and use here */}
            {/* todo: create icon abstraction */}
            <CalendarIcon className="mt-1" />
            <div className="mt-2 font-light ">{date}</div>
          </div>
        )}
        {price && (
          <div className="flex items-center justify-between gap-2">
            <PriceIcon className="mt-1" />
            <div className="mt-2 font-light">{price}</div>
          </div>
        )}
      </div>
    </div>
  );
};
