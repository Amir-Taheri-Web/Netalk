import { fetchSuggestedUsers } from "@/actions/user.action";
import Image from "next/image";
import Link from "next/link";

const RightNav = async () => {
  const users = await fetchSuggestedUsers();

  return (
    <aside className="w-[375px] bg-dark-2 px-8 py-12 sticky top-[80px] h-[calc(100vh-80px)] max-2xl:hidden flex flex-col">
      <div>
        <h2 className="text-2xl font-bold">Suggested communities</h2>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Suggested users</h2>

        <ul className="flex flex-col gap-8 max-sm:gap-8">
          {users?.map((item: any) => (
            <li
              key={item._id}
              className="bg-dark-4 p-4 rounded-lg flex gap-2 items-center"
            >
              <Image
                src={item.imageUrl}
                alt="user image"
                width={50}
                height={50}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold text-base">{item.name}</h4>
                <span className="text-sm text-gray-1">@{item.username}</span>
              </div>

              <Link
                href={`/profile/${item.userId}`}
                className="ml-auto bg-main-1 py-2 text-sm px-4 rounded-md"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightNav;
