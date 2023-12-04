"use client";

import Container from "../Container";
import { GiMeal } from "react-icons/gi";
import { MdOutlineLunchDining } from "react-icons/md";
import { BiSushi } from "react-icons/bi";
import { CiPizza } from "react-icons/ci";
import { LuIceCream } from "react-icons/lu";
import { BiSolidDrink } from "react-icons/bi";
import { TbMeat } from "react-icons/tb";
import { LuDessert } from "react-icons/lu";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

export const categories = [
  {
    label: "Refeição",
    icon: GiMeal,
  },
  {
    label: "Lanches",
    icon: MdOutlineLunchDining,
  },
  {
    label: "Oriental",
    icon: BiSushi,
  },
  {
    label: "Pizza",
    icon: CiPizza,
  },
  {
    label: "Gelados",
    icon: LuIceCream,
  },
  {
    label: "Bebidas",
    icon: BiSolidDrink,
  },
  {
    label: "Açougue",
    icon: TbMeat,
  },
  {
    label: "Sobremesas",
    icon: LuDessert,
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
