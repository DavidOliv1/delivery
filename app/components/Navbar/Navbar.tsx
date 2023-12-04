"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Search from "../SearchInput";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

type NavbarProps = {
  currentUser: User | null;
};

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed z-10 w-full bg-white">
      <div className="py-6 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-6">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
