import { useState } from "react";
// components
import { CalendarComponent as Calendar } from "../Calendar";
import { Chip } from "../Chip";
import { Dropdown } from "../Dropdown";
import { DateRangePicker } from "../ui/date-range-picker";

// const dates = ["Today", "Tomorrow", "This Weekend"];

export const DateFilter = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // todo: change key to category.id
  return (
    <div className="flex items-center justify-start gap-2">
      {/* {dates.map((date, index) => {
        return (
          <Chip
            key={index}
            value={date}
            styles={{
              basic: "bg-gray-200",
              active: "bg-brandPurple text-white",
            }}
          />
        );
      })} */}
      <DateRangePicker />
    </div>
  );
};
