import { EventList } from "@/components/EventList";
import { Filters } from "@/components/filters/Filters";
import { Section } from "@/components/Section";

export default async function Home() {
  return (
    <>
      <Section name="First Section">
        <div>intro</div>
      </Section>
      <Section>
        <Filters />
        <EventList />
      </Section>
    </>
  );
}
