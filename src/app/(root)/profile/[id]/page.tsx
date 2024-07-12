import { getUser } from "@/actions/user.action";
import ProfilePage from "@/components/templates/ProfilePage";
import { TUserProfileProps } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { FC } from "react";

const UserProfile: FC<TUserProfileProps> = async ({ params: { id } }) => {
  const user = await currentUser();

  const userData = await getUser(user?.id || "");

  const data = await getUser(id || "");

  return <ProfilePage user={data} />;
};

export default UserProfile;
