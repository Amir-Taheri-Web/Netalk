/* eslint-disable react/no-unescaped-entities */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import threadsIcon from "@/public/assets/reply-tab.svg";
import membersIcon from "@/public/assets/members.svg";
import editIcon from "@/public/assets/edit.svg";
import { TCommunityTabsProps } from "@/types/types";
import { FC } from "react";
import ThreadCard from "./ThreadCard";
import Users from "./Users";
import EditCommunityBio from "./EditCommunityBio";

const CommunityTabs: FC<TCommunityTabsProps> = async ({
  threads,
  members,
  isOwner,
  communityId,
  communityBio,
}) => {
  return (
    <>
      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="bg-dark-2 w-full justify-between mb-8">
          <TabsTrigger
            value="threads"
            className="flex items-center gap-2 bg-dark-2 border-dark-2 text-white flex-1 data-[state=active]:bg-dark-3 data-[state=active]:text-white"
          >
            <Image
              src={threadsIcon}
              alt="threads icon"
              width={20}
              height={20}
            />
            <span className="max-md:hidden">Threads</span>
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="flex items-center gap-2 bg-dark-2 border-dark-2 text-white flex-1 data-[state=active]:bg-dark-3 data-[state=active]:text-white"
          >
            <Image
              src={membersIcon}
              alt="members icon"
              width={20}
              height={20}
            />
            <span className="max-md:hidden">Members</span>
          </TabsTrigger>

          {isOwner && (
            <TabsTrigger
              value="edit"
              className="flex items-center gap-2 bg-dark-2 border-dark-2 text-white flex-1 data-[state=active]:bg-dark-3 data-[state=active]:text-white"
            >
              <Image src={editIcon} alt="edit icon" width={20} height={20} />
              <span className="max-md:hidden">Edit</span>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="threads">
          {threads.length < 1 && (
            <p className="text-white font-semibold text-2xl">No threads</p>
          )}

          <ul className="flex flex-col gap-12">
            {threads.map((item: any) => (
              <ThreadCard
                key={item._id}
                thread={item}
                isProfilePage={item.parentId ? true : false}
              />
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="members">
          {members.length < 1 && (
            <p className="text-white font-semibold text-2xl">
              There are no members for this community
            </p>
          )}

          <Users users={members} isLoading={false} />
        </TabsContent>

        {isOwner && (
          <TabsContent value="edit">
            <EditCommunityBio
              communityId={communityId}
              communityBio={communityBio}
            />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export default CommunityTabs;
