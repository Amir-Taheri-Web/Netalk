import { TThreadCardProps } from "@/types/types";
import { FC } from "react";
import Image from "next/image";
import ThreadButtons from "./ThreadButtons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ThreadCard: FC<TThreadCardProps> = ({
  thread,
  isComment,
  isThreadPage,
  isProfilePage,
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
          <Link
            href={
              thread.community
                ? `/communities/${thread.community._id}`
                : `/profile/${thread.author.userId}`
            }
            prefetch={false}
          >
            {" "}
            <Image
              src={
                thread.community
                  ? thread.community.image
                  : thread.author.imageUrl
              }
              alt="author image"
              width={100}
              height={100}
              className="rounded-full w-[55px] h-[55px] object-cover max-sm:w-[40px] max-sm:h-[40px]"
            />
          </Link>

          <div className="w-[2px] bg-dark-4 h-full" />
        </div>

        <div
          className={cn("flex flex-col gap-2 flex-1", {
            "mb-12": isComment,
            "mb-4": thread.children.length > 0,
          })}
        >
          <div className="flex items-center gap-4">
            <h4 className="font-bold">
              <Link
                href={
                  thread.community
                    ? `/communities/${thread.community._id}`
                    : `/profile/${thread.author.userId}`
                }
                prefetch={false}
              >
                {thread.community
                  ? thread.community.name
                  : thread.author.username}
              </Link>
            </h4>

            {thread.parentId && isProfilePage && (
              <Link
                href={`/thread/${thread.parentId}`}
                className="text-sm text-gray-1"
              >
                Full Thread
              </Link>
            )}
          </div>
          <p>{thread.text}</p>

          <ThreadButtons id={thread._id} />
        </div>
      </div>

      {thread.children.length > 0 && !isThreadPage && (
        <Link
          href={`/thread/${thread._id}`}
          className="flex gap-2 items-center"
          prefetch={false}
        >
          <div className="flex items-center">
            {thread.children
              .reverse()
              .slice(0, 3)
              .map((item: any, index: number) => {
                if (!isComment)
                  return (
                    <Image
                      key={item._id}
                      src={
                        item.community
                          ? item.community.image
                          : item.author?.imageUrl
                      }
                      alt="reply image"
                      width={60}
                      height={60}
                      className="rounded-full object-cover w-[30px] h-[30px] relative"
                      style={{ left: `-${index * 10}px` }}
                    />
                  );
              })}

            {thread.children.length > 3 && (
              <span className="rounded-full object-cover relative -left-[30px] w-[30px] h-[30px] bg-dark-4 text-white flex-center text-sm">
                +{thread.children.length - 3}
              </span>
            )}
          </div>
          <span
            className="text-gray-1 text-sm relative"
            style={{
              left: `-${
                (thread.children.length < 4 ? thread.children.length - 1 : 3) *
                10
              }px`,
            }}
          >
            {thread.children.length} replies
          </span>
        </Link>
      )}

      {isComment && thread.children.length > 0 && <div className="mb-4" />}
    </li>
  );
};

export default ThreadCard;
