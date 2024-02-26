import { EOrientation } from "@/types/enums";
// components
import { EventDetail } from "./EventDetail";
import { Separator } from "./Separator";
// icons
import { IoIosPricetag as PriceIcon } from "react-icons/io";
import { FaClock as TimeIcon } from "react-icons/fa6";
import { FaCalendarDays as DateIcon } from "react-icons/fa6";
import { IoHome as AddressIcon } from "react-icons/io5";
import { IoLocation as LocationIcon } from "react-icons/io5";
import { FaExternalLinkSquareAlt as UrlIcon } from "react-icons/fa";
// utils
import { formatDateTime } from "@/utils/formatDate";



export interface IEventDetails {
  startDatetime: string;
  price: string | null;
  location: string;
  address: string | null;
  link: string;
}

type TEventDetails = { eventDetails: IEventDetails };
export const EventDetails = ({ eventDetails }: TEventDetails) => {
  const { startDatetime, price, location, address, link } = eventDetails;

  const { date, time } = formatDateTime(startDatetime, true);

  const details = [
    {
      id: "date",
      text: date,
      url: "",
      icon: <DateIcon />,
    },
    {
      id: "time",
      text: time,
      url: "",
      icon: <TimeIcon />,
    },
    {
      id: "price",
      text: price ? price : "Free",
      url: "",
      icon: <PriceIcon />,
    },
    {
      id: "location",
      text: location,
      url: "",
      icon: <LocationIcon />,
    },

    {
      id: "address",
      text: address,
      url: "",
      icon: <AddressIcon />,
    },
    {
      id: "url",
      text: link && link.length > 24 ? link.slice(0, 24) + '...' : link,
      link,
      url: link,
      icon: <UrlIcon />,
    },
  ];
  return (
    <div className="flex justify-center items-center gap-2">
      {details.map(({ id, text, url, icon }, index) => (
        <div key={id} className="flex justify-center items-center gap-2">
          <EventDetail text={text} url={url} icon={icon}/>
          {index + 1 !== details.length && (
            <Separator orientation={EOrientation.VERTICAL} />
          )}
        </div>
      ))}
    </div>
  );
};
