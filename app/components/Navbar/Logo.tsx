import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="hidden md:block cursor-pointer"
      alt="Logo"
      src="/images/logo1.jpg"
      width="200"
      height="200"
    />
  );
};

export default Logo;
