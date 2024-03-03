// components
import { Calendar } from "./ui/calendar";
// types
import { SelectSingleEventHandler } from "react-day-picker";

interface ICalendarProps {
  date: Date;
  setDate: SelectSingleEventHandler;
}

export const CalendarComponent = ({ date, setDate }: ICalendarProps) => {
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};
