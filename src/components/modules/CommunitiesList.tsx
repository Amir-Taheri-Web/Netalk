import { TCommunitiesListProps } from "@/types/types";
import { FC } from "react";
import Loader from "./Loader";
import Image from "next/image";
import Link from "next/link";

const CommunitiesList: FC<TCommunitiesListProps> = ({
  communities,
  isLoading,
}) => {
  if (isLoading) return <Loader />;

  return (
    <ul className="grid grid-cols-2 max-lg:grid-cols-1 gap-12 max-sm:gap-8">
      {communities.map((item: any) => (
        <li
          key={item._id}
          className="bg-dark-3 p-4 rounded-lg flex flex-col gap-8 items-start"
        >
          <div className="flex gap-4">
            <Image
              src={item.image}
              alt="community image"
              width={200}
              height={200}
              className="rounded-full w-[60px] h-[60px] object-cover"
            />

            <div>
              <h4 className="font-semibold text-lg">{item.name}</h4>
              <span className="text-sm text-gray-1">@{item.slug}</span>
            </div>
          </div>

            <p className="text-gray-1 whitespace-nowrap overflow-hidden text-ellipsis w-full">{item.bio}</p>

          <div className="w-full flex items-center justify-between gap-4">
            {item.members.length > 0 && (
              <Link
                href={`/communities/${item._id}`}
                className="flex gap-2 items-center"
                prefetch={false}
              >
                <div className="flex items-center">
                  {item.members
                    .reverse()
                    .slice(0, 3)
                    .map((item: any, index: number) => (
                      <Image
                        key={item._id}
                        src={item.imageUrl}
                        alt="user image"
                        width={30}
                        height={30}
                        className="rounded-full object-cover w-[30px] h-[30px] relative"
                        style={{ left: `-${index * 10}px` }}
                      />
                    ))}

                  {item.members.length > 3 && (
                    <span className="rounded-full object-cover relative -left-[30px] w-[30px] h-[30px] bg-dark-4 text-white flex-center text-sm">
                      +{item.children.length - 3}
                    </span>
                  )}
                </div>
              </Link>
            )}

            <Link
              href={`/communities/${item._id}`}
              className="ml-auto bg-main-1 py-2 text-sm px-4 rounded-md"
            >
              View
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommunitiesList;
