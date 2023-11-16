"use client";

import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { IoMdAlert } from "react-icons/io";
import { cn } from "@/app/utils/cn";

type InputProps = {
  id: string;
  label?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  search?: boolean;
  floatingLabel?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  id,
  label,
  type = "text",
  required,
  search,
  floatingLabel,
  disabled,
  placeholder,
  register,
  errors,
  className,
  ...rest
}: InputProps) => {
  return (
    <div className="w-full relative">
      {search && (
        <CiSearch
          size={20}
          className="absolute top-1/2 -translate-y-1/2 left-3"
        />
      )}
      <input
        className={cn(
          "peer bg-white outline-none p-4 w-full border-[1px] border-neutral-300 focus:border-black rounded-md shadow-sm focus:shadow-md font-light text-sm transition disabled:opacity-70 disabled:cursor-not-allowed pl-4",
          className,
          {
            "pl-11": search,
            "pt-6": floatingLabel,
            "border-rose-500": errors[id],
            "focus:border-rose-500": errors[id],
          }
        )}
        id={id}
        type={type}
        disabled={disabled}
        required={required}
        {...register(id)}
        placeholder={floatingLabel ? " " : placeholder}
        {...rest}
      />
      {errors[id] && (
        <div className="absolute z-10 top-full flex flex-row items-center text-xs p-1 text-rose-500 gap-1">
          <IoMdAlert size={15} />
          {`${errors[id]?.message}`}
        </div>
      )}
      {floatingLabel && (
        <label
          className={cn(
            "absolute text-sm duration-150 transform top-1/2 left-1/2 -translate-y-6 z-10 origin-[0] left-4 cursor-text peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 scale-75 text-zinc-400",
            {
              "left-11": search,
              "text-rose-500": errors[id],
            }
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
