import { IconType } from "react-icons";
import { cn } from "../utils/cn";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
};

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  className,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 w-full px-2 border-[1px] bg-violet-500 border-violet-500 text-white py-3 text-md font-semibold",
        {
          "bg-white border-violet-500 text-violet-500": outline,
          "py-1 text-sm font-light": small,
        },
        className
      )}
    >
      {Icon && (
        <Icon
          size={small ? "18" : "24"}
          className={`absolute ${small ? "top-[5px]" : "top-3"} left-4`}
        />
      )}
      {label}
    </button>
  );
};

export default Button;
