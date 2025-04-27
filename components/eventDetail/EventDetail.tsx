interface IEventDetail {
  text?: string | null;
  url?: string;
  icon?: React.ReactNode;
  styles?: string;
}

export const EventDetail = ({ text, icon, styles, url }: IEventDetail) => {
  if (!text) {
    return;
  }

  const Tag = url ? "a" : "div";

  return (
    <Tag
      {...(url && { href: url })}
      className={`text-brandPurple bg-transparent px-2 py-1 flex justify-center items-center gap-2 ${styles}`}
    >
      <div className="w-4 h-4">{icon && icon}</div>
      <p className={`text-sm font-thin ${url ? "underline" : ""}`}>{text}</p>
    </Tag>
  );
};
