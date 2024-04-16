"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
// components
import { Button } from "@/components/Button";
import { EventDetails, IEventDetails } from "@/components/EventDetails";
import { Section } from "@/components/Section";
import { Separator } from "@/components/Separator";
import { Banner } from "@/components/banner/Banner";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { EventCard } from "@/components/eventCard/EventCard";
// types
import { EOrientation } from "@/types/enums";
// mock data
import { events } from "@/app/events";
import { Loader } from "@/components/Loader";
import { IEventCard } from "@/types/interfaces";

const Event = () => {
  const router = useRouter();
  const { id } = useParams();

  // todo: add event type
  const [event, setEvent] = useState({} as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async (eventId: number) => {
      const res = await fetch(`/api/events/${eventId}`);
      const event = await res.json();
      setLoading(false);
      setEvent(event);
    };

    getEvent(Number(id));
  }, [id]);

  const onBackClick = () => {
    router.back();
  };

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
      {loading ? (
        <Loader styles={{ container: "py-16" }} />
      ) : (
        <>
          <Section>
            <EventDetails eventDetails={eventDetails} />
          </Section>
          <Section>
            <div className="flex items-start justify-start gap-6">
              <Button
                text="Back"
                icon={<ArrowBackIcon />}
                onClick={onBackClick}
              />
              <p>{event.description}</p>
            </div>
          </Section>
          <Separator orientation={EOrientation.HORIZONTAL} />
          <Section name="You may also like">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8  pb-12">
              {event.recommendations.map((event: IEventCard) => {
                return <EventCard {...event} key={event.id} />;
              })}
            </div>
          </Section>
        </>
      )}
    </>
  );
};

export default Event;
