export const EventCardInfo = ({ title, date, location }) => {
  return (
    <div className="p-8">
      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        {title}
      </div>
      {date && <div className="mt-2 text-gray-500">{date}</div>}
      <div>{location}</div>
    </div>
  );
};
