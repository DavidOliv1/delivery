"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

type UserMenuProps = {
  currentUser: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onOpen: onRegisterModalOpen } = useRegisterModal();
  const { onOpen: onLoginModalOpen } = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleMenuItemRegisterClick = () => {
    setIsOpen(false);
    onRegisterModalOpen();
  };

  const handleMenuItemLoginClick = () => {
    setIsOpen(false);
    onLoginModalOpen();
  };

  return (
    <div className="relative">
      <div
        onClick={toggleOpen}
        className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <AiOutlineMenu />
        <div className="hidden md:block">
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[200px] right-0 top-12 bg-white text-sm overflow-hidden">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="Meus pedidos" onClick={() => {}} />
                <MenuItem label="Dados cadastrais" onClick={() => {}} />
                <MenuItem label="Formas de pagamento" onClick={() => {}} />
                <MenuItem label="Favoritos" onClick={() => {}} />
                <MenuItem label="Cupons" onClick={() => {}} />
                <hr />
                <MenuItem label="Sair" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Cadastrar-se"
                  onClick={handleMenuItemRegisterClick}
                />
                <MenuItem label="Entrar" onClick={handleMenuItemLoginClick} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
