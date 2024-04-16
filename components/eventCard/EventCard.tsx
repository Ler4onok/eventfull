import Image from "next/image";
import Link from "next/link";
// types
import { IEventCard } from "@/types/interfaces";
// compinents
import { EventCardInfo } from "./EventCardInfo";
import { formatDateTime } from "@/utils/formatDate";
import { adjustTextSize } from "@/utils/adjustText";

export const EventCard = ({
  id,
  title: eventTitle,
  startDate,
  location,
  imageLink,
  categories,
}: IEventCard) => {
  const { date } = formatDateTime(startDate);

  const title = adjustTextSize(eventTitle, window.innerWidth);
  const category = categories && categories[0];

  return (
    <Link href={`/events/${id}`}>
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
              // layout="responsive"
            />
          )}
        </div>
        <EventCardInfo title={title} date={date} location={location} />
      </div>
    </Link>
  );
};
