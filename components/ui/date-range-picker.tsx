"use client";
// todo: refactor whole component
import React, {
  type FC,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Calendar } from "./calendar";
import { DateInput } from "./date-input";

import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useDropdownSelect } from "@/hooks/useDropdownSelect";

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: { range: DateRange }) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
}

const formatDate = (date: Date, locale: string = "en-us"): string => {
  return date.toLocaleDateString(locale, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface DateRange {
  from: Date;
  to: Date | undefined;
}

interface Preset {
  name: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  { name: "today", label: "Today" },
  { name: "tomorrow", label: "Tomorrow" },
  { name: "thisWeek", label: "This Week" },
  { name: "thisMonth", label: "This Month" },
];

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  onUpdate,
  align = "end",
  locale = "en-US",
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
    to: initialDateTo
      ? new Date(new Date(initialDateTo).setHours(0, 0, 0, 0))
      : new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
  });

  // Refs to store the values of range when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>();

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPresetRange = (presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName);
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
    const from = new Date();
    const to = new Date();
    const first = from.getDate() - from.getDay();
    const currentMonthDays = new Date(
      to.getFullYear(),
      to.getMonth() + 1,
      0
    ).getDate();

    switch (preset.name) {
      case "today":
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "tomorrow":
        from.setDate(from.getDate() + 1);
        from.setHours(0, 0, 0, 0);
        to.setDate(to.getDate() + 1);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisWeek":
        const currentDay = from.getDay();
        const distanceToMonday = currentDay - 1; // 1 represents Monday
        const distanceToNextSunday = 7 - currentDay; // 7 represents next Sunday

        from.setDate(from.getDate() - distanceToMonday);
        from.setHours(0, 0, 0, 0);

        to.setDate(to.getDate() + distanceToNextSunday);
        to.setHours(23, 59, 59, 999);
        break;
      case "thisMonth":
        from.setDate(1);
        to.setDate(currentMonthDays);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
    }

    return { from, to };
  };

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset);
    console.log({ range });
    setRange(range);
  };

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);

      const normalizedRangeFrom = new Date(range.from.setHours(0, 0, 0, 0));
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0)
      );

      const normalizedRangeTo = new Date(range.to?.setHours(0, 0, 0, 0) ?? 0);
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      );

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name);
        return;
      }
    }

    setSelectedPreset(undefined);
  };

  const resetValues = (): void => {
    setRange({
      from:
        typeof initialDateFrom === "string"
          ? new Date(initialDateFrom)
          : initialDateFrom,
      to: initialDateTo
        ? typeof initialDateTo === "string"
          ? new Date(initialDateTo)
          : initialDateTo
        : typeof initialDateFrom === "string"
        ? new Date(initialDateFrom)
        : initialDateFrom,
    });
  };

  useEffect(() => {
    checkPreset();
  }, [range]);

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
    }
  }, [isOpen, range]);

  const isSameDate = String(range.to?.getDate()) === String(range.from.getDate());

  const { onDateSelect } = useDropdownSelect({ paramType: "date" });

  const getRangeLabel = useCallback(
    (range: DateRange): string => {
      const isSameDate = String(range.to?.getDate()) === String(range.from.getDate());
      const rangeLabel = `${formatDate(range.from, locale)} ${
        !isSameDate
          ? range.to != null
            ? " - " + formatDate(range.to, locale)
            : ""
          : ""
      }`;
      return rangeLabel;
    },
    [locale]
  );

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string;
    label: string;
    isSelected: boolean;
  }) => (
    <Button
      className={`rounded-md p-2 border-[1px] border-white bg-gray-200 ${
        isSelected && "bg-brandPurple text-white"
      }`}
      variant="none"
      onClick={() => {
        setPreset(preset);
        const range = getPresetRange(preset);
        const rangeLabel = getRangeLabel(range);
        onUpdate?.({ range });
        onDateSelect(rangeLabel);
      }}
    >
      <>{label}</>
    </Button>
  );

  const rangeLabel = useMemo(
    () => getRangeLabel(range),
    [getRangeLabel, range]
  );

  return (
    <div className="flex gap-2">
      <div className="flex gap-2">
        {PRESETS.map((preset) => (
          <PresetButton
            key={preset.name}
            preset={preset.name}
            label={preset.label}
            isSelected={selectedPreset === preset.name}
          />
        ))}
      </div>
      <Popover
        modal={true}
        open={isOpen}
        onOpenChange={(open: boolean) => {
          if (!open) {
            resetValues();
          }
          setIsOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button size={"default"} variant="outline">
            <div className="text-right">
              <div className="py-1">
                <div>{rangeLabel}</div>
              </div>
            </div>
            <div className="pl-1 opacity-60 -mr-2 scale-125">
              {isOpen ? (
                <ChevronUpIcon width={24} />
              ) : (
                <ChevronDownIcon width={24} />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto">
          <div className="flex py-2">
            <div className="flex">
              <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row gap-2 px-3 justify-start items-center lg:items-start pb-4 lg:pb-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <DateInput
                        value={range.from}
                        onChange={(date) => {
                          const toDate =
                            range.to == null || date > range.to
                              ? date
                              : range.to;
                          setRange((prevRange) => ({
                            ...prevRange,
                            from: date,
                            to: toDate,
                          }));
                        }}
                      />
                      {!isSameDate && (
                        <>
                          <div className="py-1">-</div>
                          <DateInput
                            value={range.to}
                            onChange={(date) => {
                              const fromDate =
                                date < range.from ? date : range.from;
                              setRange((prevRange) => ({
                                ...prevRange,
                                from: fromDate,
                                to: date,
                              }));
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* {isSmallScreen && (
                <Select
                  defaultValue={selectedPreset}
                  onValueChange={(value) => {
                    setPreset(value);
                  }}
                >
                  <SelectTrigger className="w-[180px] mx-auto mb-2">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )} */}
                <div>
                  <Calendar
                    mode="range"
                    onSelect={(
                      value: { from?: Date; to?: Date } | undefined
                    ) => {
                      if (value?.from != null) {
                        setRange({ from: value.from, to: value?.to });
                      }
                    }}
                    selected={range}
                  />
                </div>
              </div>
            </div>
            {/* {!isSmallScreen && (
            <div className="flex flex-col items-end gap-1 pr-2 pl-6 pb-6">
              <div className="flex w-full flex-col items-end gap-1 pr-2 pl-6 pb-6">
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.name}
                    preset={preset.name}
                    label={preset.label}
                    isSelected={selectedPreset === preset.name}
                  />
                ))}
              </div>
            </div>
          )} */}
          </div>
          <div className="flex justify-end gap-2 py-2 pr-4">
            <Button
              onClick={() => {
                resetValues();
              }}
              variant="ghost"
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                onUpdate?.({ range });
                onDateSelect(rangeLabel);
              }}
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

DateRangePicker.displayName = "DateRangePicker";
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx";
