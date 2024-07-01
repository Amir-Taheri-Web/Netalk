"use client";

import { SIDE_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const path = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 w-full sm:hidden bg-dark-2 p-4">
      <nav>
        <ul className="flex flex-row justify-between gap-2">
          {SIDE_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.link}
                className={cn("flex gap-4 p-3 rounded-lg", {
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
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default BottomNav;
