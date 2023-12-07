import { Dropdown } from "../Dropdown";
// icons
import { LocationIcon } from "../icons/LocationIcon";

export const LocationFilter = () => {
  return (
    <Dropdown
      options={[
        { value: "Funchal" },
        { value: "Ponto do Sol" },
        { value: "Porto Moniz" },
      ]}
      styles={{ button: "p-1", dropdown: "" }}
      icon={<LocationIcon className="mr-1" />}
    />
  );
};
