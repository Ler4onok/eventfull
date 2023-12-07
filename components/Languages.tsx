import { Dropdown } from "./Dropdown";

export const Languages = () => {
  return (
    <Dropdown
      options={[{ value: "En" }, { value: "Pt" }]}
      styles={{ button: "border-2", dropdown: "origin-top-right right-0" }}
    />
  );
};
