import Input from "./inputs/Input";
import { useForm } from "react-hook-form";

const SearchInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="relative w-2/5 md:w-2/5 lg:w-4/12 flex flex-row items-center">
      <Input
        search
        placeholder="Buscar estabelecimentos"
        className="rounded-full left-4"
        id="search"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default SearchInput;
