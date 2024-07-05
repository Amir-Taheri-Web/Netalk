import { getUser } from "@/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();
  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <div>Home</div>;
};

export default Home;
