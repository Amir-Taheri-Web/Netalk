import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import threadsIcon from "@/public/assets/reply-tab.svg";
import repliesIcon from "@/public/assets/request-tab.svg";
import editIcon from "@/public/assets/edit.svg";
import { TProfileTabsProps } from "@/types/types";
import { FC, Key } from "react";
import ThreadCard from "./ThreadCard";
import OnboardingPage from "../templates/OnboardingPage";

const ProfileTabs: FC<TProfileTabsProps> = ({
  mainThreads,
  replyThreads,
  userInfo,
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
            value="replies"
            className="flex items-center gap-2 bg-dark-2 border-dark-2 text-white flex-1 data-[state=active]:bg-dark-3 data-[state=active]:text-white"
          >
            <Image
              src={repliesIcon}
              alt="replies icon"
              width={20}
              height={20}
            />
            <span className="max-md:hidden">Replies</span>
          </TabsTrigger>
          {userInfo && (
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
          <ul className="flex flex-col gap-12">
            {mainThreads.map((item: { _id: Key | null | undefined }) => (
              <ThreadCard key={item._id} thread={item} />
            ))}
          </ul>
        </TabsContent>

        <TabsContent value="replies">
          <ul className="flex flex-col gap-12">
            {replyThreads.map((item: { _id: Key | null | undefined }) => (
              <ThreadCard key={item._id} thread={item} isProfilePage={true} />
            ))}
          </ul>
        </TabsContent>

        {userInfo && (
          <TabsContent value="edit">
            <OnboardingPage userInfo={userInfo} isEdit={true} />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export default ProfileTabs;
