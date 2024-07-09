import { TUsersProps } from "@/types/types";
import { FC } from "react";
import Loader from "./Loader";
import Image from "next/image";
import Link from "next/link";

const Users: FC<TUsersProps> = ({ users, isLoading }) => {
  if (isLoading) return <Loader />;

  return (
    <ul className="flex flex-col gap-12 max-sm:gap-8">
      {users.map((item: any) => (
        <li
          key={item._id}
          className="bg-dark-4 p-4 rounded-lg flex gap-4 items-center"
        >
          <Image
            src={item.imageUrl}
            alt="user image"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />

          <div>
            <h4 className="font-semibold text-lg">{item.name}</h4>
            <span className="text-sm text-gray-1">@{item.username}</span>
          </div>

          <Link href={`/profile/${item.userId}`} className="ml-auto bg-main-1 py-2 text-sm px-4 rounded-md">View</Link>
        </li>
      ))}
    </ul>
  );
};

export default Users;
