"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signUpSchema } from "@/app/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onClose } = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reset, isOpen]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    reset();
  };

  const bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="Bem-vindo ao QueroDelivery"
        subtitle="Crie sua conta e comece a pedir já!"
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
      <Input
        floatingLabel
        register={register}
        id="confirmPassword"
        label="Confirmar senha"
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
      title="Cadastrar-se"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
