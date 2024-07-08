import { TThreadCardProps } from "@/types/types";
import { FC } from "react";
import Image from "next/image";
import ThreadButtons from "./ThreadButtons";
import { cn } from "@/lib/utils";

const ThreadCard: FC<TThreadCardProps> = ({
  thread,
  isComment,
  isThreadPage,
}) => {
  return (
    <li
      className={cn("p-8 max-sm:px-4 rounded-lg flex flex-col gap-2", {
        "bg-dark-3": !isComment,
        "py-0": isComment,
      })}
    >
      <div className="flex gap-4">
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

        <div
          className={cn("flex flex-col gap-2 flex-1", {
            "mb-12": isComment,
            "mb-4": thread.children.length > 0,
          })}
        >
          <h4 className="font-bold">{thread.author.username}</h4>
          <p>{thread.text}</p>

          <ThreadButtons id={thread._id} />
        </div>
      </div>

      {thread.children.length > 0 && !isThreadPage && (
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            {thread.children.slice(0, 3).map((item: any, index: number) => (
              <Image
                key={item._id}
                src={item.author?.imageUrl}
                alt="reply image"
                width={30}
                height={30}
                className="rounded-full object-cover relative"
                style={{ left: `-${index * 10}px` }}
              />
            ))}

            {thread.children.length > 3 && (
              <span className="rounded-full object-cover relative -left-[30px] w-[30px] h-[30px] bg-dark-4 text-white flex-center text-sm">
                +{thread.children.length - 3}
              </span>
            )}
          </div>
          <span
            className="text-gray-1 text-sm relative"
            style={{ left: `-${(thread.children.length < 4 ? thread.children.length - 1 : 3) * 10}px` }}
          >
            {thread.children.length} replies
          </span>
        </div>
      )}
    </li>
  );
};

export default ThreadCard;
