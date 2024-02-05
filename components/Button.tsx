interface IButtonProps {
  text: string;
  icon?: React.ReactNode;
  styles?: string;
}

export const Button = ({ text, icon, styles }: IButtonProps) => {
  return (
    <button className="border-2 border-purple-500 text-purple-500 bg-transparent px-2 py-1 rounded flex justify-center items-center gap-2">
      {icon && icon}
      <p>{text}</p>
    </button>
  );
};
