"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

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
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, []);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

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
          pt-3
          md:h-auto
          md:p-0
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
                /* border-0 */ className="p-[6px] rounded-full hover:bg-neutral-100 hover:opacity-70 transition absolute left-9"
                onClick={handleClose}
              >
                <IoMdClose size={18} />
              </button>
              <div className="text-base font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">
              {body}
              <div className="flex flex-row items-center gap-4 w-full mt-6">
                {secondaryActionLabel && secondaryAction && (
                  <Button
                    outline
                    disabled={disabled}
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                  />
                )}
                <Button
                  disabled={disabled}
                  label={actionLabel}
                  onClick={handleSubmit}
                />
              </div>
            </div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6 pt-0">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
