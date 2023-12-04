"use client";

import { cn } from "@/app/utils/cn";
import { IconType } from "react-icons";

type CategoryInputProps = {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
};

const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer border-neutral-200",
        {
          "border-black": selected,
        }
      )}
    >
      <div className="flex flex-row gap-3 items-center">
        <Icon size={25} />
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
