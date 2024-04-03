import { Dropdown } from "./Dropdown";

export const Languages = () => {
  return (
    <Dropdown
      options={["En", "Pt"]}
      styles={{ button: "border-[1px]", dropdown: "origin-top-right right-0" }}
      paramType="lang"
    />
  );
};
