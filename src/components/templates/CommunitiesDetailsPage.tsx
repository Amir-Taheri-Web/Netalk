import { TCommunitiesDetailsPageProps } from "@/types/types";
import Image from "next/image";
import { FC } from "react";
import CommunityTabs from "../modules/CommunityTabs";
import { currentUser } from "@clerk/nextjs/server";

const CommunitiesDetailsPage: FC<TCommunitiesDetailsPageProps> = async ({
  community,
}) => {
  const user = await currentUser();
  const isOwner = community.owner.userId === user?.id;
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-[1000px] flex-center flex-col w-full">
        <div className="border-b-2 border-dark-3 flex flex-col gap-6 w-full mb-10 pb-10">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={community.image}
                alt="profile avatar"
                width={200}
                height={200}
                className="rounded-full w-[80px] h-[80px] object-cover"
              />
            </div>

            <div>
              <h2 className="font-bold text-2xl">{community.name}</h2>
              <span className="text-gray-1 font-semibold">
                @{community.slug}
              </span>
            </div>
          </div>

          <p>{community.bio}</p>
        </div>

        <div className="w-full">
          <CommunityTabs
            threads={community.threads}
            members={community.members}
            isOwner={isOwner}
            communityId={community.communityId}
            communityBio={community.bio}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunitiesDetailsPage;
