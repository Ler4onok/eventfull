import { EOrientation } from "@/types/enums";
import { EventDetail } from "./EventDetail";
import { Separator } from "./Separator";
import { ArrowBackIcon } from "./icons/ArrowBackIcon";

export interface IEventDetails {
  date: string;
  time: string | null;
  price: string | null;
  location: string;
  address: string | null;
  link: string;
}

type TEventDetails = { eventDetails: IEventDetails };
export const EventDetails = ({ eventDetails }: TEventDetails) => {
  const { date, time, price, location, address, link } = eventDetails;

  const details = [
    {
      id: "date",
      text: date,
      url: "",
      icon: <ArrowBackIcon />,
    },
    {
      id: "time",
      text: time,
      url: "",
      icon: <ArrowBackIcon />,
    },
    {
      id: "location",
      text: location,
      url: "",
      icon: <ArrowBackIcon />,
    },

    {
      id: "address",
      text: address,
      url: "",
      icon: <ArrowBackIcon />,
    },
    {
      id: "url",
      text: link,
      url: link,
      icon: <ArrowBackIcon />,
    },
  ];
  return (
    <div className="flex justify-center items-center gap-2">
      {details.map(({ id, text, url, icon }) => (
        <div key={id} className="flex justify-center items-center gap-2">
          <EventDetail text={text} url={url} icon={icon} />
          <Separator orientation={EOrientation.VERTICAL} />
        </div>
      ))}
    </div>
  );
};
