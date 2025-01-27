import { TThreadPageProps } from "@/types/types";
import { FC } from "react";
import ThreadCard from "../modules/ThreadCard";
import { fetchThread } from "@/actions/thread.action";
import PostComment from "../modules/PostComment";
import ThreadComments from "../modules/ThreadComments";

const ThreadPage: FC<TThreadPageProps> = async ({ id }) => {
  const thread = await fetchThread(id);

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1000px] w-full flex self-center flex-col gap-12">
        <ThreadCard thread={thread} isThreadPage={true} />
        <div className="h-[94px]">
          <PostComment parentId={id} />
        </div>

        <div>
          <ThreadComments childThreads={thread.children} />
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
