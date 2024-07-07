import { TThreadPageProps } from "@/types/types";
import { FC } from "react";
import ThreadCard from "../modules/ThreadCard";
import { fetchThread } from "@/actions/thread.action";
import PostComment from "../modules/PostComment";

const ThreadPage: FC<TThreadPageProps> = async ({ id }) => {
  const thread = await fetchThread(id);

  return (
    <div className="w-full flex flex-col">
      <div className="max-w-[1000px] flex self-center flex-col gap-12">
        <ThreadCard thread={thread} />
        <div>
          <PostComment parentId={id} />
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
