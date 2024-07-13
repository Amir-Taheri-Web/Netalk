import CommunitiesDetailsPage from "@/components/templates/CommunitiesDetailsPage";
import { TCommunityDetailsProps } from "@/types/types";
import { FC } from "react";

const CommunityDetails: FC<TCommunityDetailsProps> = ({ params: { id } }) => {
  return <CommunitiesDetailsPage id={id} />;
};

export default CommunityDetails;
