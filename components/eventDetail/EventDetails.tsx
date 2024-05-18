// icons
import { IoIosPricetag as PriceIcon } from "react-icons/io";
import { FaClock as TimeIcon } from "react-icons/fa6";
import { FaCalendarDays as DateIcon } from "react-icons/fa6";
import { IoHome as AddressIcon } from "react-icons/io5";
import { IoLocation as LocationIcon } from "react-icons/io5";
import { FaExternalLinkSquareAlt as UrlIcon } from "react-icons/fa";
// utils
import { formatDateTime } from "@/utils/formatDate";
import { DetailsGroup } from "./DetailsGroup";

export interface IEventDetails {
  startDatetime: string;
  price: string | null;
  location: string;
  address: string | null;
  link: string;
}

type TEventDetails = { eventDetails: IEventDetails };

export interface IEventDetail {
  id: string;
  text: string | null;
  url?: string;
  icon?: React.ReactNode;
  link?: string;
}

export const EventDetails = ({ eventDetails }: TEventDetails) => {
  const { startDatetime, price, location, address, link } = eventDetails;

  const { date, time } = formatDateTime(startDatetime, true);

  const details: IEventDetail[] = [
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
      text: link && link.length > 24 ? link.slice(0, 24) + "..." : link,
      link,
      url: link,
      icon: <UrlIcon />,
    },
  ];

  const firstGroup = details.slice(0, 2);
  const secondGroup = details.slice(2, 5);
  const thirdGroup = details.slice(5, 6);

  return (
    <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
      <DetailsGroup details={firstGroup} />
      <DetailsGroup details={secondGroup} />
      <DetailsGroup details={thirdGroup} />
    </div>
  );
};
