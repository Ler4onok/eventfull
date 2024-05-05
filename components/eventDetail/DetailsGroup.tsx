import { EOrientation } from "@/types/enums";
import { Separator } from "../Separator";
import { EventDetail } from "./EventDetail";
import { IEventDetail } from "./EventDetails";

export const DetailsGroup = ({ details }: { details: IEventDetail[] }) => (
  <div className="group flex gap-2 align-center justify-start">
    {details.map(({ id, text, url, icon }, index) => (
      <div key={id} className="flex justify-center items-center gap-2">
        <EventDetail text={text} url={url} icon={icon} />
        {index + 1 !== details.length && text && (
          <Separator orientation={EOrientation.VERTICAL} />
        )}
      </div>
    ))}
  </div>
);
