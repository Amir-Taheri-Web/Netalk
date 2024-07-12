import { fetchThreads } from "@/actions/thread.action";
import HomePage from "@/components/templates/HomePage";

const Home = async () => {
  const threads = await fetchThreads(10, 0);
  const result = JSON.parse(threads as string);
  return <HomePage result={result} />;
};

export default Home;
