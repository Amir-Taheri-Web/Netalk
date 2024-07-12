import { getUser } from "@/actions/user.action";
import ProfilePage from "@/components/templates/ProfilePage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();

  const userData = await getUser(user?.id || "");

  return <ProfilePage user={userData} isPrivate={true} />;
};

export default Profile;
