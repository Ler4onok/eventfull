export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  styles?: { container?: string; svg?: string };
}

export const Loader = ({ size = 24, styles, ...props }: ISVGProps) => {
  return (
    <div
      className={`width-full flex items-center justify-center ${styles?.container}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`animate-spin ${styles?.svg}`}
        {...props}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
};
