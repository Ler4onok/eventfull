import { Banner } from "@/components/banner/Banner";
import { EventList } from "@/components/EventList";
import { Filters } from "@/components/filters/Filters";
import { Section } from "@/components/Section";

export default async function Home() {
  return (
    <>
      <Banner />
      <Section>
        <Filters />
        <EventList />
      </Section>
    </>
  );
}
