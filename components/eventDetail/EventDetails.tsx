// icons
import { IoIosPricetag as PriceIcon } from "react-icons/io";
import { FaClock as TimeIcon } from "react-icons/fa6";
import { FaCalendarDays as DateIcon } from "react-icons/fa6";
import { IoHome as AddressIcon } from "react-icons/io5";
import { IoLocation as LocationIcon } from "react-icons/io5";
import { FaExternalLinkSquareAlt as UrlIcon } from "react-icons/fa";
// utils
import { DetailsGroup } from "./DetailsGroup";
import { TEventDetails } from "@/app/events/[slug]/page";
import { Separator } from "../Separator";
import { EOrientation } from "@/types/enums";

export interface IEventDetail {
  id: string;
  text?: string | null;
  url?: string;
  icon?: React.ReactNode;
  link?: string;
}

export const EventDetails = ({
  eventDetails,
}: {
  eventDetails: TEventDetails;
}) => {
  const {
    startDate,
    endDate,
    startTime,
    address,
    location,
    sourceLink,
    price,
  } = eventDetails;

  const isSameDay = startDate === endDate;

  const details: IEventDetail[] = [
    {
      id: "date",
      text: `${startDate} ${endDate && !isSameDay ? "- " + endDate : ""}`,
      url: "",
      icon: <DateIcon />,
    },
    {
      id: "time",
      text: startTime,
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
      text:
        sourceLink && sourceLink.length > 24
          ? sourceLink.slice(0, 24) + "..."
          : sourceLink,
      link: sourceLink,
      url: sourceLink,
      icon: <UrlIcon />,
    },
  ];

  const firstGroup = details.slice(0, 2);
  const secondGroup = details.slice(2, 5);
  const thirdGroup = details.slice(5, 6);

  return (
    <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
      <DetailsGroup details={firstGroup} />
      <Separator orientation={EOrientation.VERTICAL} />
      <DetailsGroup details={secondGroup} />
      <Separator orientation={EOrientation.VERTICAL} />
      <DetailsGroup details={thirdGroup} />
    </div>
  );
};
