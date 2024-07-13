import { getUser } from "@/actions/user.action";
import ProfilePage from "@/components/templates/ProfilePage";
import { TUserProfileProps } from "@/types/types";
import { FC } from "react";

const UserProfile: FC<TUserProfileProps> = async ({ params: { id } }) => {
  const data = await getUser(id || "");

  return <ProfilePage user={data} />;
};

export default UserProfile;
