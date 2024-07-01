import Image from "next/image";
import logo from "@/public/assets/logo.png";

const TopNav = () => {
  return (
    <header className="flex justify-between gap-8 items-center px-8 h-[90px] fixed top-0 left-0 w-full z-40 bg-dark-2">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold">
        <Image
          src={logo}
          alt="header logo"
          width={30}
          height={30}
          className="h-auto"
        />
        Netalk
      </h1>

      <div>
        <span>clerk goes here</span>
      </div>
    </header>
  );
};

export default TopNav;
