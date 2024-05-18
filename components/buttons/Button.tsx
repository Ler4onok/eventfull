interface IButtonProps {
  text: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  styles?: string;
}

export const buttonStyles = 'border-[1px] border-brandPurple text-brandPurple bg-transparent px-2 py-1 rounded flex justify-center items-center gap-2'

export const Button = ({ text, onClick, icon, href, styles }: IButtonProps) => {
  return (
    <a
      {...(href && { href })}
      onClick={onClick}
      className={`${buttonStyles} ${styles}`}
    >
      {icon && icon}
      <p className="font-thin">{text}</p>
    </a>
  );
};
