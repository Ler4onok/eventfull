interface IEventDetail {
  text: string | null;
  url?: string;
  icon?: React.ReactNode;
  styles?: string;
}

export const EventDetail = ({
  text,
  url = "https://google.com",
  icon,
  styles,
}: IEventDetail) => {
  if (!text) {
    return;
  }
  return (
    <a
      href={url}
      className={`text-brandPurple bg-transparent px-2 py-1  flex justify-center items-center gap-2 ${styles}`}
    >
      {icon && icon}
      <p>{text}</p>
    </a>
  );
};
