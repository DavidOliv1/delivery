"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#222222]/60 flex items-center justify-center">
      <div
        className="
          relative
          w-full
          md:max-w-[568px]
          my-6
          mx-auto
          h-full
          lg:h-auto
          md:h-auto
        "
      >
        {/* CONTENT */}
        <div
          className={`
          translate
          duration-300
          h-full
          ${showModal ? "translate-y-0" : "translate-y-full"}
          ${showModal ? "opacity-100" : "opacity-0"}
        `}
        >
          <div
            // border-0
            // outline-none
            // focus:outline-none
            className="
            translate
            h-full
            lg:h-auto
            md:h-auto
            rounded-xl
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-white
          "
          >
            {/* HEADER */}
            <div
              /* rounded-t */ className="flex items-center p-6 justify-center relative border-b-[1px]"
            >
              <button
                /* border-0 */ className="p-1 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-base font-semibold">{title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
