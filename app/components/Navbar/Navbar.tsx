"use client";

import Container from "../Container";
import Input from "../Input";
import Search from "../SearchInput";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white">
      <div className="py-8 border-b-[1px] shadow-sm">
        <Container>
          <div className="flex flex-row items-center justify-between gap-6">
            <Logo />
            <Search />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
