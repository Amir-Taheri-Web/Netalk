import { getUser } from "@/actions/user.action";
import OnboardingPage from "@/components/templates/OnboardingPage";
import { currentUser } from "@clerk/nextjs/server";

const Onboarding = async () => {
  const user = await currentUser();
  const userData = await getUser(user?.id || "");

  const userInfo = {
    imageUrl: userData?.imageUrl || user?.imageUrl || "",
    name: userData?.name || user?.firstName || "",
    username: userData?.username || user?.username || "",
    bio: userData?.bio || "",
  };

  return <OnboardingPage userInfo={userInfo} />;
};

export default Onboarding;
