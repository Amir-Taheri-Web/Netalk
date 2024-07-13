import { fetchCommunity } from "@/actions/community.action";
import CommunitiesDetailsPage from "@/components/templates/CommunitiesDetailsPage";
import { TCommunityDetailsProps } from "@/types/types";
import { FC } from "react";

const CommunityDetails: FC<TCommunityDetailsProps> = async ({
  params: { id },
}) => {
  const data = await fetchCommunity(id);
  return <CommunitiesDetailsPage community={data} />;
};

export default CommunityDetails;
