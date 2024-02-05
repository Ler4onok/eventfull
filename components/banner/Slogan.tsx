interface ISloganProps {
  title: string;
}

export const Slogan = ({title}: ISloganProps) => {
  return (
    <div className="absolute text-white z-10 w-full h-full flex items-center justify-center">
      <p className="text-7xl font-semibold">{title}</p>
    </div>
  );
};
