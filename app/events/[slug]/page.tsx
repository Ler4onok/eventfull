export const revalidate = 60;
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

// components
import { EventDetails } from "@/components/eventDetail/EventDetails";
import { Section } from "@/components/Section";
import { Separator } from "@/components/Separator";
import { Banner } from "@/components/banner/Banner";
import { EventCard } from "@/components/eventCard/EventCard";
import { BackButton } from "@/components/buttons/BackButton";
// types
import { EOrientation } from "@/types/enums";
import { IEvent, IEventCard } from "@/types/interfaces";
// utils
import { formatDateTime } from "@/utils/formatDate";
// metadata
import type { Metadata } from "next";

export type TEventDetails = Pick<
  IEvent,
  "price" | "location" | "sourceLink" | "address"
> & { startDate?: string; endDate?: string; startTime?: string };

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, description, imageLink, price, categories } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`
  ).then((res) => res.json());

  return {
    title: `${title} - ${!price ? "Free, " : ""}${
      categories ? categories.join(", ") : ""
    }, Madeira`,
    description: description?.slice(0, 150),
    openGraph: {
      title: `${title} - Eventfull Madeira`,
      description: description?.slice(0, 150),
      images: new URL(imageLink!),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Eventfull Madeira`,
      description: description?.slice(0, 150),
      images: new URL(imageLink!),
    },
    icons: { icon: "/favicon_eventfull.png" },
  };
}

export default async function Event({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const {
    title,
    startDate: startDateData,
    endDate: endDateData,
    price,
    location,
    address,
    sourceLink,
    imageLink,
    categories,
    description,
    recommendations,
  } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/${slug}`).then(
    (res) => res.json()
  );

  const { startDate, startTime, endDate } = formatDateTime({
    startDate: startDateData,
    endDate: endDateData,
  });

  const eventDetails: TEventDetails = {
    startDate,
    endDate,
    startTime,
    price,
    location,
    address,
    sourceLink,
  };

  return (
    <>
      <Banner image={imageLink} title={title} categories={categories} />
      <Section>
        <EventDetails eventDetails={eventDetails} />
      </Section>
      <Section>
        <div className="flex items-start justify-start gap-6">
          <BackButton styles="hidden sm:flex" />
          <span dangerouslySetInnerHTML={{ __html: description }}></span>
        </div>
      </Section>
      <Separator orientation={EOrientation.HORIZONTAL} />
      <Section name="You may also like">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8  pb-12">
          {recommendations?.map((event: IEventCard) => {
            return <EventCard {...event} key={slug} />;
          })}
        </div>
      </Section>
    </>
  );
}
