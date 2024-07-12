import ThreadPage from "@/components/templates/ThreadPage";
import { TThreadDetailsProps } from "@/types/types";
import { FC } from "react";

const Thread: FC<TThreadDetailsProps> = async ({ params: { id } }) => {
  return <ThreadPage id={id} />;
};

export default Thread;
