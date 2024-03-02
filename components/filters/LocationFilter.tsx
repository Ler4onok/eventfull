import { BetterDropdown } from "../BetterDropdown";
// icons
import { LocationIcon } from "../icons/LocationIcon";

const options = ["Funchal", "Ponto do Sol", "Porto Moniz"];

export const LocationFilter = () => {
  return (
    <BetterDropdown
      label="Choose location"
      options={options}
      icon={<LocationIcon className="mr-1" />}
      paramType="location"
    />
  );
};
