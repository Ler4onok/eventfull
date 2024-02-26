interface IButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
  styles?: string;
}

export const Button = ({ text, onClick, icon, styles }: IButtonProps) => {
  return (
    <button onClick={onClick} className={`border-[1px] border-brandPurple text-brandPurple bg-transparent px-2 py-1 rounded flex justify-center items-center gap-2 ${styles}`}>
      {icon && icon}
      <p className="font-thin">{text}</p>
    </button>
  );
};
