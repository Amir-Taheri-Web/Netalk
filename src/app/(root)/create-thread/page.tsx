import { getUser } from "@/actions/user.action";
import CreateThreadPage from "@/components/templates/CreateThreadPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateThread = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <CreateThreadPage />;
};

export default CreateThread;
