import { TCommunityDetailsProps } from "@/types/types";
import { FC } from "react";

const CommunityDetails: FC<TCommunityDetailsProps> = ({ params: { id } }) => {
  return <div>CommunityDetails - #{id}</div>;
};

export default CommunityDetails;
