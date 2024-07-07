import { getUser } from "@/actions/user.action";
import ProfilePage from "@/components/templates/ProfilePage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <ProfilePage user={userData} />;
};

export default Profile;
