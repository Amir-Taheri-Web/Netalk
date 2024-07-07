import { TThreadCardProps } from "@/types/types";
import { FC } from "react";
import Image from "next/image";
import ThreadButtons from "./ThreadButtons";
import { cn } from "@/lib/utils";

const ThreadCard: FC<TThreadCardProps> = ({ thread, isComment }) => {
  return (
    <li
      className={cn("p-8 max-sm:px-4 rounded-lg flex gap-4", {
        "bg-dark-3": !isComment,
        "py-0": isComment,
      })}
    >
      <div className="flex flex-col gap-2 items-center">
        <Image
          src={thread.author.imageUrl}
          alt="author image"
          width={55}
          height={55}
          className="rounded-full object-cover max-sm:w-[40px] max-sm:h-[40px]"
        />

        <div className="w-[2px] bg-dark-4 h-full" />
      </div>

      <div className={cn("flex flex-col gap-2 flex-1", { "mb-12": isComment })}>
        <h4 className="font-bold">{thread.author.username}</h4>
        <p>{thread.text}</p>

        <ThreadButtons id={thread._id} />
      </div>
    </li>
  );
};

export default ThreadCard;
