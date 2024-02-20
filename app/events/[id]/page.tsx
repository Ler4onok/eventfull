"use client";
import { useParams } from "next/navigation";
// components
import { Button } from "@/components/Button";
import { EventDetails, IEventDetails } from "@/components/EventDetails";
import { Section } from "@/components/Section";
import { Separator } from "@/components/Separator";
import { Banner } from "@/components/banner/Banner";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
// types
import { EOrientation } from "@/types/enums";
// mock data
import { events } from "@/app/events";
import { useRouter } from "next/navigation";



const Event = () => {
  const { id } = useParams();
  const router = useRouter();

  // todo: change 
  const eventId = Number(id) - 1;
  const event = events[eventId];

  const onBackClick = () => {
    router.back();
  }
// todo: startDate and end_date change in schema
// todo: add end_date support 
  const eventDetails: IEventDetails = {
    date: `${event.startDate} ${event.end_date ? `- ${event.end_date}` : ''}`,
    time: event.start_time,
    price: event.price,
    location: event.location,
    address: event.address, 
    link: event.sourceLink,
  }
  return (
    <>
      <Banner image={event.imageLink} title={event.title} />
      <Section>
        <EventDetails eventDetails={eventDetails}/>
      </Section>
      <Section>
        <div className="flex items-start justify-start gap-6">
          <Button text="Back" icon={<ArrowBackIcon />} onClick={onBackClick} />
          <p>{event.description}</p>
        </div>
      </Section>
      <Separator orientation={EOrientation.HORIZONTAL} />
      <Section name="You might also like">events</Section>
    </>
  );
};

export default Event;
