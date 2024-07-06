import { fetchThreads } from "@/actions/thread.action";
import ThreadCard from "../modules/ThreadCard";

const HomePage = async () => {
  const threads = await fetchThreads();
  console.log(threads);

  return (
    <div className="flex flex-col gap-8">
      <h2 className="main-title">Home</h2>

      <ul className="max-w-[1000px] self-center w-full flex-1 flex flex-col gap-12">
        {threads?.map((item) => (
          <ThreadCard key={item._id} thread={item} />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
