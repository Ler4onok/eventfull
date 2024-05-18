// todo: change date format
export const formatDateTime = (
  datetime: any,
  isEventDetail: boolean = false
) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const dt = new Date(datetime);
  const date = dt.toLocaleDateString(
    isEventDetail ? "en-US" : "en-GB",
    isEventDetail
      ? { ...dateOptions, weekday: "long", month: "long" }
      : dateOptions
  );

  const time = dt.toLocaleTimeString("en-US", timeOptions);

  return { date, time };
};

export const createDateFromString = (dateString: string): Date => {
  const parts = dateString.split("/");
  // Create a Date object directly from the parts
  const dateObject = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  return dateObject;
};
