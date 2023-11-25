import { EventList } from "@/components/EventList";
import { Section } from "@/components/Section";

export default async function Home() {
  return (
    <>
      <Section name="First Section">
        <div>intro</div>
      </Section>
      <Section name="Events">
        <EventList />
      </Section>
    </>
  );
}
