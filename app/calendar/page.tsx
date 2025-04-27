import { Section } from "@/components/Section";
import { Banner } from "@/components/banner/Banner";
import { BackButton } from "@/components/buttons/BackButton";

const Calendar = () => {
  return (
    <>
      <Banner />
      <Section>
        <div className="flex justify-between items-center gap-8 p-4 w-full">
          <BackButton />
          <div className="text-center">Coming soon...</div>
          <div></div>
        </div>
      </Section>
    </>
  );
};

export default Calendar;
