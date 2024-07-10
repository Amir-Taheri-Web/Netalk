import { getUser } from "@/actions/user.action";
import ActivityPage from "@/components/templates/ActivityPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Activity = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <ActivityPage user={userData} />;
};

export default Activity;
