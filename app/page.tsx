// components
import { Banner } from "@/components/banner/Banner";
import { EventList } from "@/components/EventList";
import { Filters } from "@/components/filters/Filters";
import { Section } from "@/components/Section";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/`);
  const { events, categories } = await res.json();

  return (
    <>
      <Banner />
      <Section styles="pb-16">
        <Filters categories={categories} />
        <EventList events={events} loading={false} />
      </Section>
    </>
  );
}
