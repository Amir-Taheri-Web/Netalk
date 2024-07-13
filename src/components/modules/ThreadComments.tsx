import { TThreadCommentsProps } from "@/types/types";
import { FC, Key } from "react";
import ThreadCard from "./ThreadCard";

const ThreadComments: FC<TThreadCommentsProps> = ({ childThreads }) => {
  return (
    <ul className="flex flex-col max-sm:mb-8">
      {childThreads.map((item: any) => (
        <ThreadCard key={item._id} thread={item} isComment={true} />
      ))}
    </ul>
  );
};

export default ThreadComments;
