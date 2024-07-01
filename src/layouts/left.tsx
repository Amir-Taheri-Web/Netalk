"use client";

import { SIDE_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import logout from "@/public/assets/logout.svg";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LeftNav = () => {
  const path: string = usePathname();
  console.log(path);

  return (
    <aside className="w-[275px] bg-dark-2 px-8 py-12 sticky top-[80px] h-[calc(100vh-80px)]">
      <nav className="h-full">
        <ul className="flex flex-col gap-8 h-full">
          {SIDE_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.link}
                className={cn("flex gap-4 p-4 rounded-lg", {
                  "bg-main-1": path.includes(item.link),
                })}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={25}
                  height={25}
                  className="h-auto"
                />
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <Link href="/" className="flex gap-4 p-4 rounded-lg">
              <Image
                src={logout}
                alt="logout icon"
                width={25}
                height={25}
                className="h-auto"
              />
              <span className="text-lg">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftNav;
