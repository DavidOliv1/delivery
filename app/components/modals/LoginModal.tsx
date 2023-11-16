"use client";

import { useEffect, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useLoginModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reset, isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((response) => {
      setIsLoading(false);

      if (response?.ok) {
        router.refresh();
        onClose();
        reset();
      }

      if (response?.error) {
        console.log(response.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Bem-vindo ao QueroDelivery"
        subtitle="Entre agora para fazer seu pedido!"
      />
      <Input
        floatingLabel
        register={register}
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        errors={errors}
        required
      />
      <Input
        floatingLabel
        register={register}
        id="password"
        label="Senha"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        onClick={() => signIn("google")}
        icon={FcGoogle}
        outline
        label="Continuar com Google"
      />
      <Button
        onClick={() => signIn("github")}
        icon={FaGithub}
        outline
        label="Continuar com Github"
      />
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="Continuar"
      isOpen={isOpen}
      disabled={isLoading}
      title="Entrar"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
