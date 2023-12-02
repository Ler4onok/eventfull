import { IEventCard } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";

export const EventCard = ({
  id,
  title,
  startDate,
  location,
  imageLink,
}: IEventCard) => {
  const date = startDate && new Date(startDate).toLocaleDateString();

  return (
    <Link href={`/events/${id}`}>
      <div className="max-w-md mx-auto bg-white rounded-xl hover:shadow-lg shadow-md overflow-hidden md:max-w-2xl m-4 h-[400px]">
        {imageLink && (
          <Image
            className="h-[200px] w-full object-cover"
            src={imageLink}
            alt={title}
            width={500}
            height={200}
            // layout="responsive"
          />
        )}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {title}
          </div>
          {date && <div className="mt-2 text-gray-500">{date}</div>}
          <div>{location}</div>
        </div>
      </div>
    </Link>
  );
};
