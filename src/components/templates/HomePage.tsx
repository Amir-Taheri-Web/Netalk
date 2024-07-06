import { fetchThreads } from "@/actions/thread.action";
import ThreadCard from "../modules/ThreadCard";
import LoadMoreThreads from "../modules/LoadMoreThreads";
import { Key } from "react";

const HomePage = async () => {
  const threads = await fetchThreads(10, 0);
  const result = JSON.parse(threads as string);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="main-title">Home</h2>

      <ul className="max-w-[1000px] self-center w-full flex-1 flex flex-col gap-12">
        {result.threads?.map((item: { _id: Key | null | undefined }) => (
          <ThreadCard key={item._id} thread={item} />
        ))}
      </ul>
      <LoadMoreThreads />
    </div>
  );
};

export default HomePage;
