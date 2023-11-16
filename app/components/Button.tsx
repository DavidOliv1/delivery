import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    w-full
    border-[1px]
    ${outline ? "bg-white" : "bg-violet-500"}
    ${outline ? "border-violet-500" : "border-violet-500"}
    ${outline ? "text-violet-500" : "text-white"}
    ${small ? "py-1" : "py-3"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "font-light" : "font-semibold"}
  `}
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
