import { Dropdown } from "./Dropdown";

export const Languages = () => {
  return (
    <Dropdown options={[{ value: "En" }, { value: "Pt" }]} styles="border-2" />
  );
};
