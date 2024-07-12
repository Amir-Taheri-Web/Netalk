import ThreadPage from "@/components/templates/ThreadPage";
import { TThreadDetailsProps } from "@/types/types";
import { FC } from "react";

const Thread: FC<TThreadDetailsProps> = ({ params: { id } }) => {
  return <ThreadPage id={id} />;
};

export default Thread;
