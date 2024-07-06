import Image from "next/image";
import loaderIcon from "@/public/assets/loader.svg";

const Loader = () => {
  return (
    <div className="w-full flex-center">
      <Image src={loaderIcon} alt="loader icon" width={50} height={50} />
    </div>
  );
};

export default Loader;
