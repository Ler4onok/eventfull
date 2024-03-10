import { BetterDropdown } from "../BetterDropdown";
// icons
import { LocationIcon } from "../icons/LocationIcon";

const options = ["Funchal", "Ponto do Sol", "Porto Moniz"];

export const LocationFilter = () => {
  return (
    <div className="flex items-stretch justify-start gap-2 flex-wrap h-full">
      <BetterDropdown
        label="Choose location"
        options={options}
        icon={<LocationIcon className="mr-1" />}
        paramType="location"
        styles={{button: 'p-2'}}
      />
    </div>
  );
};
