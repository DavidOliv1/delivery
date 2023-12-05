"use client";

import usePlaceModal from "@/app/hooks/usePlaceModal";
import Modal from "./Modal";
import { useCallback, useState, useEffect } from "react";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerPlaceSchema } from "@/app/libs/types";
import { IoMdAlert } from "react-icons/io";

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
}

const RegisterPlaceModal = () => {
  const { isOpen, onClose, onOpen } = usePlaceModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(registerPlaceSchema),
    defaultValues: {
      category: "",
      imageSrc: "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    reset();
  }, [reset, isOpen])

  const category = watch("category");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    

    setIsLoading(true);

    try {
      await axios.post("/api/places", data);
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent = (
    <div className="relative flex flex-col gap-8">
      <Heading title="Qual dessas categorias melhor descreve seu estabelecimento?" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
        {errors['category'] && (
            <div className="absolute z-10 top-full flex flex-row items-center text-xs p-1 mt-2 text-rose-500 gap-1">
              <IoMdAlert size={15} />
              {`${errors?.['category'].message}`}
            </div>
          )}
      </div>
    </div>
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="relative flex flex-col gap-8">
        <Heading title="Adicione uma imagem para seu estabelecimento" />
        <ImageUpload
          error={errors.imageSrc}
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-7">
        <Heading title="Como você descreveria seu estabelecimento?" />
        <Input
          id="name"
          label="Nome"
          floatingLabel
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="description"
          label="Descrição"
          floatingLabel
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Cadastrar estabelecimento"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={step !== STEPS.DESCRIPTION ? onNext : handleSubmit(onSubmit)}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      actionLabel={step === STEPS.DESCRIPTION ? "Cadastrar" : "Avançar"}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Voltar"}
      body={bodyContent}
    />
  );
};

export default RegisterPlaceModal;
