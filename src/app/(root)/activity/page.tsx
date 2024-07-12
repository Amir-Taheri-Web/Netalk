import { getUser } from "@/actions/user.action";
import ActivityPage from "@/components/templates/ActivityPage";
import { currentUser } from "@clerk/nextjs/server";

const Activity = async () => {
  const user = await currentUser();

  const userData = await getUser(user?.id || "");

  return <ActivityPage user={userData} />;
};

export default Activity;
