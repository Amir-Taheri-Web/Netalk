import BottomNav from "@/layouts/bottom";
import LeftNav from "@/layouts/left";
import RightNav from "@/layouts/right";
import TopNav from "@/layouts/top";
import { TProps } from "@/types/types";
import { FC } from "react";

const MainLayout: FC<TProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full">
      <TopNav />
      <div className="mt-[90px] flex justify-between w-full">
        <LeftNav />
        <main>{children}</main>
        <RightNav />
      </div>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
