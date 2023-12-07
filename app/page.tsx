"use client";

import { Banner } from "@/components/banner/Banner";
import { EventList } from "@/components/EventList";
import { Filters } from "@/components/filters/Filters";
import { Section } from "@/components/Section";
// import { signal } from "@preact/signals-react";

// export const setCategories = (value) => {
//   console.log(value);
//   categories.value = [...categories.value, value];
//   localStorage.setItem("categories", JSON.stringify(categories.value));
// };

// console.log(categories.value);
export default function Home() {
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
