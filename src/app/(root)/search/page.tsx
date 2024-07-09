import { getUser } from "@/actions/user.action";
import SearchPage from "@/components/templates/SearchPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Search = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const userData = await getUser(user?.id || "");

  if (!userData?.onboarding) redirect("/onboarding");

  return <SearchPage />;
};

export default Search;
