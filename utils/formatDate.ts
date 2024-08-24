interface IFormatDateTime {
  startDate?: Date;
  endDate?: Date;
  isEventDetail?: boolean;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
};

const toLocaleDt = (dt: Date, isEventDetail?: boolean): string => {
  return dt.toLocaleDateString(
    isEventDetail ? "en-US" : "en-GB",
    isEventDetail
      ? { ...dateOptions, weekday: "long", month: "long" }
      : dateOptions
  );
};

export const formatDateTime = ({
  startDate,
  endDate,
  isEventDetail,
}: IFormatDateTime) => {
  const startDt = startDate && new Date(startDate);
  const endDt = endDate && new Date(endDate);

  const startDateFormatted = startDt && toLocaleDt(startDt, isEventDetail);
  const startTimeFormatted = startDt?.toLocaleTimeString("en-US", timeOptions);

  const endDateFormatted = endDt && toLocaleDt(endDt, isEventDetail);
  const endDateformatted = endDt?.toLocaleTimeString("en-US", timeOptions);

  return {
    startDate: startDateFormatted,
    startTime: startTimeFormatted,
    endDate: endDateFormatted,
    endTime: endDateformatted,
  };
};

export const createDateFromString = (dateString: string): Date => {
  const parts = dateString.split("/");
  // Create a Date object directly from the parts
  const dateObject = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
  return dateObject;
};
