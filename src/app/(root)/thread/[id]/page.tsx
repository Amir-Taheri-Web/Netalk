import { getUser } from "@/actions/user.action";
import ThreadPage from "@/components/templates/ThreadPage";
import { TThreadDetailsProps } from "@/types/types";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FC } from "react";

const Thread: FC<TThreadDetailsProps> = async ({ params: { id } }) => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <ThreadPage id={id} />;
};

export default Thread;
