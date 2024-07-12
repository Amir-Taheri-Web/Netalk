import { TActivityProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const ActivityPage: FC<TActivityProps> = ({ user }) => {
  const children = user.threads
    .map((item: any) => {
      if (item.children.length !== 0) {
        return item.children;
      }
    })
    .filter(Boolean)
    ?.flat().slice(0, 20);

  return (
    <div className="max-w-[1000px] mx-auto flex flex-col gap-8">
      <h2 className="main-title">Activity</h2>

      {children.length === 0 && <p className="text-lg font-semibold">No activity found</p>}

      <ul className="flex flex-col gap-8">
        {children?.map((item: any) => (
          <li key={item._id}>
            <Link href={`/thread/${item.parentId}`} className="bg-dark-3 py-2 px-4 flex gap-4 items-center rounded-lg max-sm:flex-col max-sm:gap-2">
              <Image
                src={item.author.imageUrl}
                alt="user image"
                width={40}
                height={40}
                className="rounded-full w-[40px] h-[40px] object-cover"
              />

              <span className="text-main-1 font-semibold">{item.author.username || item.author.name}</span>

              <span>replied to your thread</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPage;
