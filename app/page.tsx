"use client";

// components
import { Banner } from "@/components/banner/Banner";
import { EventList } from "@/components/EventList";
import { Filters } from "@/components/filters/Filters";
import { Section } from "@/components/Section";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// todo: change
const homeImage =
  "https://images.unsplash.com/photo-1567351344506-b2e8a94e273b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const homeTitle = "Let your life be eventfull";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.push(`${pathname}?location=Funchal`, { scroll: false });
  }, []);

  return (
    <>
      <Banner image={homeImage} title={homeTitle} />
      <Section>
        <Filters />
        <EventList />
      </Section>
    </>
  );
}
