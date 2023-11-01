import Input from "./Input";
import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="relative w-2/5 md:w-2/5 lg:w-4/12 flex flex-row items-center">
      <div className="absolute left-3">
        <CiSearch size={18} />
      </div>
      <Input
        id="search"
        className="pl-9"
        placeholder="Pesquisar"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default SearchInput;
