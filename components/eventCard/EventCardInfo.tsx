import { IEventCard } from "@/types/interfaces";
// icons
import { FaCalendarAlt as CalendarIcon } from "react-icons/fa";
import { IoMdPricetag as PriceIcon } from "react-icons/io";

type TEventCardInfo = Partial<IEventCard> & { date: string };

const commonIconProps = {
  className: "mt-1 text-brandPurple",
};

export const EventCardInfo = ({ title, date, price: eventPrice }: TEventCardInfo) => {
  const price = eventPrice ? eventPrice.length > 16 ? `${eventPrice?.substring(0, 16)}...` : null: 'Free';
  return (
    <div className="py-4">
      <div className="text-sm font-bold text-xl h-14 overflow-hidden">{title}</div>
      <div className="flex items-center justify-between">
        {/* todo: new component or map to get rid of duplication */}
        {date && (
          <div className="flex items-center justify-between gap-2">
            {/* todo: create global variable color and use here */}
            {/* todo: create icon abstraction */}
            <CalendarIcon {...commonIconProps} />
            <div className="mt-2 font-light ">{date}</div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <PriceIcon {...commonIconProps} />
          <div className="mt-2 font-light" title={eventPrice}>{price}</div>
        </div>
      </div>
    </div>
  );
};
