import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  name?: string;
}

export const Section = ({ children, name }: SectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-12 py-6 gap-6">
      {name && <h3 className="text-2xl">{name}</h3>}
      {children}
    </div>
  );
};
