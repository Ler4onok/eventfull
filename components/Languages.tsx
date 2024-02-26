import { Dropdown } from "./Dropdown";

export const Languages = () => {
  return (
    <Dropdown
      options={[{ value: "En" }, { value: "Pt" }]}
      styles={{ button: "border-[1px]", dropdown: "origin-top-right right-0" }}
    />
  );
};
