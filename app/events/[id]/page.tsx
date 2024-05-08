// components
import { Button } from "@/components/buttons/Button";
import {
  EventDetails,
  IEventDetails,
} from "@/components/eventDetail/EventDetails";
import { Section } from "@/components/Section";
import { Separator } from "@/components/Separator";
import { Banner } from "@/components/banner/Banner";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { EventCard } from "@/components/eventCard/EventCard";
// types
import { EOrientation } from "@/types/enums";
import { IEventCard } from "@/types/interfaces";
import BackButton from "@/components/buttons/BackButton";

export default async function Event({
  params: { id },
}: {
  params: { id: string };
}) {
  const eventData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${id}`
  );
  const event = await eventData.json();

  // todo: startDate and end_date change in schema
  // todo: add end_date support
  const eventDetails: IEventDetails = {
    // date: `${event.startDate} ${event.endDate ? `- ${event.endDate}` : ''}`,
    startDatetime: event.startDate,
    price: event.price,
    location: event.location,
    address: event.address,
    link: event.sourceLink,
  };
  return (
    <>
      <Banner
        image={event.imageLink}
        title={event.title}
        categories={event.categories}
      />
      <Section>
        <EventDetails eventDetails={eventDetails} />
      </Section>
      <Section>
        <div className="flex items-start justify-start gap-6">
          <BackButton styles="hidden sm:flex" />
          <p>{event.description}</p>
        </div>
      </Section>
      <Separator orientation={EOrientation.HORIZONTAL} />
      <Section name="You may also like">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8  pb-12">
          {event.recommendations?.map((event: IEventCard) => {
            return <EventCard {...event} key={event.id} />;
          })}
        </div>
      </Section>
    </>
  );
}
