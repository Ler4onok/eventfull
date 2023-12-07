import { Chip } from "../Chip";
import { Dropdown } from "../Dropdown";

const dates = ["Today", "Tomorrow", "This Weekend"];

export const DateFilter = () => {
  // todo: change key to category.id
  return (
    <>
      {dates.map((date, index) => {
        return (
          <Chip
            key={index}
            value={date}
            styles={{ basic: "bg-gray-200", active: "bg-gray-500 text-white" }}
          />
        );
      })}
      <Dropdown
        label="Choose the date"
        options={[{ value: "1" }, { value: "2" }]}
      />
    </>
  );
};
