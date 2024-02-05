import { EOrientation } from "@/types/enums";
import { Section } from "./Section";

interface ISeparatorProps {
  orientation: EOrientation;
}

export const Separator = ({ orientation }: ISeparatorProps) => {
  if (orientation === EOrientation.HORIZONTAL) {
    return (
      <Section>
        <div className="border-t border-gray-200 w-full" />
      </Section>
    );
  }

  return <div className="border-l border-gray-200 h-[24px]" />;
};
