import Image from "next/image";

const Logo = () => {
  return (
    <Image
      className="hidden md:block cursor-pointer"
      alt="Logo"
      src="/images/logo.png"
      width="100"
      height="100"
    />
  );
};

export default Logo;
