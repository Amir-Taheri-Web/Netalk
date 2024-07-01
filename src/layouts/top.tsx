import Image from "next/image";
import logo from "@/public/assets/logo.png";
import Link from "next/link";
import { OrganizationSwitcher, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import logout from "@/public/assets/logout.svg";

const TopNav = () => {
  return (
    <header className="flex justify-between gap-8 items-center px-8 h-[80px] fixed top-0 left-0 w-full z-40 bg-dark-2">
      <h1 className="text-2xl font-extrabold">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="header logo"
            width={30}
            height={30}
            className="h-auto"
          />
          Netalk
        </Link>
      </h1>

      <div className="flex items-center">
        <div className="sm:hidden">
          <SignOutButton redirectUrl="/sign-in">
            <div className="flex gap-4 p-4 rounded-lg cursor-pointer">
              <Image
                src={logout}
                alt="logout icon"
                width={20}
                height={20}
                className="h-auto"
              />
              <span className="text-lg max-lg:hidden">Logout</span>
            </div>
          </SignOutButton>
        </div>
        <OrganizationSwitcher appearance={{ baseTheme: dark }} />
      </div>
    </header>
  );
};

export default TopNav;
