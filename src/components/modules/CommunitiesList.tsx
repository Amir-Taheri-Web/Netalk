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
    <ul className="flex flex-col gap-12 max-sm:gap-8">
      {communities.map((item: any) => (
        <li
          key={item._id}
          className="bg-dark-4 p-4 rounded-lg flex gap-4 items-center"
        >
          <Image
            src={item.image}
            alt="community image"
            width={60}
            height={60}
            className="rounded-full w-[60px] h-[60px] object-cover"
          />

          <div>
            <h4 className="font-semibold text-lg">{item.name}</h4>
            <span className="text-sm text-gray-1">@{item.slug}</span>
          </div>

          <Link
            href={`/communities/${item.communityId}`}
            className="ml-auto bg-main-1 py-2 text-sm px-4 rounded-md"
          >
            View
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CommunitiesList;
