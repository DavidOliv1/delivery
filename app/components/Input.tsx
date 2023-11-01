import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = {
  id: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  id,
  label,
  type = "text",
  required,
  disabled,
  register,
  errors,
  className,
  ...rest
}: InputProps) => {
  return (
    <input
      className={twMerge(
        "bg-white outline-none px-4 py-2 w-full border-[1px] rounded-md shadow-sm focus:shadow-md font-light text-sm",
        className
      )}
      id={id}
      type={type}
      disabled={disabled}
      required={required}
      {...register(id, { required })}
      {...rest}
    />
  );
};

export default Input;
