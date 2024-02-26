// todo: change date format
export const formatDateTime = (datetime: any, isEventDetail: boolean = false) => {
  const dateOptionsDetail = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateOptionsEvent = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  };

  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const dt = new Date(datetime);
  const date = dt.toLocaleDateString(
    isEventDetail ? "en-US" : "en-GB",
    isEventDetail ? dateOptionsDetail : dateOptionsEvent
  );

  const time = dt.toLocaleTimeString("en-US", timeOptions);

  return { date, time };
};
