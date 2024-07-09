import { getUser } from "@/actions/user.action";
import ProfilePage from "@/components/templates/ProfilePage";
import { TUserProfileProps } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

const UserProfile: FC<TUserProfileProps> = async ({ params: { id } }) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  const data = await getUser(id || "");

  return <ProfilePage user={data} />;
};

export default UserProfile;
