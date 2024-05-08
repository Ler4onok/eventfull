interface IButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  styles?: string;
}

export const Button = ({ text, onClick, icon, href, styles }: IButtonProps) => {
  return (
    <a
      {...(href && { href })}
      onClick={onClick}
      className={`border-[1px] border-brandPurple text-brandPurple bg-transparent px-2 py-1 rounded flex justify-center items-center gap-2 ${styles}`}
    >
      {icon && icon}
      <p className="font-thin">{text}</p>
    </a>
  );
};
