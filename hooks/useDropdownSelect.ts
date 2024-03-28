import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface IDropdownSelectProps {
  paramType: string;
  options?: string[];
  customLabel?: string;
}

export const useDropdownSelect = ({
  paramType,
  options,
  customLabel,
}: IDropdownSelectProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParams = new URLSearchParams(searchParams);
  const categories = queryParams.getAll(paramType);
  let params = categories.length === 0 ? [] : categories.toString().split(",");

  const onSelect = (event: React.FormEvent<HTMLDivElement>) => {
    const category = event.currentTarget.textContent as string;

    if (params.includes(category)) {
      params = params.filter((param) => param !== category);
      params.length === 0
        ? queryParams.delete(paramType)
        : queryParams.set(paramType, params.join(","));
      return router.push(`${pathname}?${queryParams.toString()}`, {
        scroll: false,
      });
    }

    queryParams.set(paramType, [...params, category].join(","));
    router.push(`${pathname}?${queryParams.toString()}`, { scroll: false });
  };

  const onDateSelect = (range: string | undefined) => {
    range ? queryParams.set(paramType, range): queryParams.delete(paramType);
    return router.push(`${pathname}?${queryParams.toString()}`, {
      scroll: false,
    });
  };

  const isActive = (value: string): boolean => {
    return params.includes(value);
  };

  const dropdownLabelCategories = params
    .filter((param) => options?.includes(param))
    .join(", ");

  const label = dropdownLabelCategories
    ? dropdownLabelCategories?.length > 16
      ? dropdownLabelCategories?.slice(0, 16) + "..."
      : dropdownLabelCategories
    : customLabel;

  return { onSelect, onDateSelect, isActive, label };
};
