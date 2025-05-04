import Image from "next/image";
import Link from "next/link";
// types
import { IEventCard } from "@/types/interfaces";
// components
import { EventCardInfo } from "./EventCardInfo";
// utils
import { formatDateTime } from "@/utils/formatDate";

export const EventCard = ({
  slug,
  title,
  startDate: startDateData,
  imageLink,
  categories,
  price,
}: IEventCard) => {
  const { startDate } = formatDateTime({ startDate: startDateData });

  const category = categories && categories[0];

  return (
    <Link href={`/events/${slug}`}>
      <div className="max-w-md mx-auto bg-white overflow-hidden md:max-w-2xl m-4 h-[300px]">
        <div className="rounded-xl overflow-hidden relative">
          <div className="absolute top-2 right-2 bg-white z-10 rounded-md text-brandPurple px-1">
            {category}
          </div>
          {imageLink && (
            <Image
              className="h-[200px] w-full object-cover rounded-xl transform transition-all duration-500 hover:scale-110 hover:rounded-xl"
              src={imageLink}
              alt={title}
              width={500}
              height={200}
            />
          )}
        </div>
        <EventCardInfo title={title} startDate={startDate} price={price} />
      </div>
    </Link>
  );
};
