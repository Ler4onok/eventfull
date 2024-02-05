"use client";
import { useParams } from "next/navigation";
// components
import { Button } from "@/components/Button";
import { EventDetails } from "@/components/EventDetails";
import { Section } from "@/components/Section";
import { Separator } from "@/components/Separator";
import { Banner } from "@/components/banner/Banner";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
// types
import { EOrientation } from "@/types/enums";
// mock data
import { events } from "@/app/events";

const Event = () => {
  const { id } = useParams();
  const eventId = Number(id) - 1;
  const event = events[eventId];
  return (
    <>
      <Banner image={event.imageLink} title={event.title} />
      <Section>
        <EventDetails />
      </Section>
      <Section>
        <div className="flex items-start justify-start gap-6">
          <Button text="Back" icon={<ArrowBackIcon />} />
          <p>{event.description}</p>
        </div>
      </Section>
      <Separator orientation={EOrientation.HORIZONTAL} />
      <Section name="You might also like">events</Section>
    </>
  );
};

export default Event;
