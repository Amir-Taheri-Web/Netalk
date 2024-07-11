import { TProfileProps } from "@/types/types";
import Image from "next/image";
import { FC } from "react";
import ProfileTabs from "../modules/ProfileTabs";

const ProfilePage: FC<TProfileProps> = ({ user, isPrivate }) => {
  const mainThreads = user.threads.filter(
    (item: { parentId: any }) => !!!item.parentId
  );
  const replyThreads = user.threads.filter(
    (item: { parentId: any }) => !!item.parentId
  );

  const userInfo = {
    userId: user?.userId || "",
    imageUrl: user?.imageUrl || "",
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[1000px] flex-center flex-col w-full">
        <div className="border-b-2 border-dark-3 flex flex-col gap-6 w-full mb-10 pb-10">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={user.imageUrl}
                alt="profile avatar"
                width={80}
                height={80}
                className="rounded-full w-[80px] h-[80px] object-cover"
              />
            </div>

            <div>
              <h2 className="font-bold text-2xl">{user.name}</h2>
              <span className="text-gray-1 font-semibold">
                @{user.username}
              </span>
            </div>
          </div>

          <p>{user.bio}</p>
        </div>

        <div className="w-full">
          <ProfileTabs
            mainThreads={mainThreads.reverse()}
            replyThreads={replyThreads.reverse()}
            userInfo={!isPrivate ? null : userInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
