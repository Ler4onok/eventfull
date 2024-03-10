// components
import { Chip } from "../Chip";
import { DateRangePicker } from "../ui/date-range-picker";

const dates = ["Today", "Tomorrow", "This Weekend"];

export const DateFilter = () => {
  // todo: change key to category.id
  return (
    <div className="flex items-stretch justify-start gap-2">
      {dates.map((date, index) => {
        return (
          <Chip
            key={index}
            value={date}
            paramType="date"
            styles={{
              basic: "bg-gray-200",
              active: "bg-brandPurple text-white",
            }}
          />
        );
      })}
      <DateRangePicker />
    </div>
  );
};
