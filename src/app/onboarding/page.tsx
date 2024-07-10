import { createUser, getUser } from "@/actions/user.action";
import OnboardingPage from "@/components/templates/OnboardingPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const user = await currentUser();
  let userData = await getUser(user?.id || "");

  if (!userData) {
    userData = await createUser({
      userId: user?.id || "",
      imageUrl: user?.imageUrl || "",
      username: user?.username || "",
      name: user?.firstName || "",
      bio: "",
    });
  }

  if (userData?.onboarding) redirect("/profile");

  const userInfo = {
    userId: userData?.userId || "",
    imageUrl: userData?.imageUrl || "",
    name: userData?.name || "",
    username: userData?.username || "",
    bio: userData?.bio || "",
  };

  return <OnboardingPage userInfo={userInfo} />;
};

export default Onboarding;
