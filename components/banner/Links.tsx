import Link from "next/link";

export const Links = () => {
  return (
    <div className="hidden md:flex items-center justify-center gap-8">
      <Link href="/map">Map</Link>
      <Link href="/calendar">Calendar</Link>
    </div>
  );
};
