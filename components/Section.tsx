import { ReactNode } from "react";

interface ISectionProps {
  children: ReactNode;
  name?: string;
  styles?: string;
}

export const Section = ({ children, name, styles}: ISectionProps) => {
  return (
    <div className={`flex flex-col items-center justify-center px-12 py-6 gap-6 ${styles ? styles: ''}`}>
      {name && <h3 className="text-2xl">{name}</h3>}
      {children}
    </div>
  );
};
