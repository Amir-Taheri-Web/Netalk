import { User } from "@clerk/nextjs/server";
import { Model, Types } from "mongoose";

export type TProps = Readonly<{
  children: React.ReactNode;
}>;

export type TSideLinks = {
  icon: string;
  label: string;
  link: string;
}[];

export interface IUser {
  userId: string;
  imageUrl: string;
  name: string;
  username: string;
  bio: string;
  communities: Types.ObjectId[];
  threads: Types.ObjectId[];
  onboarding: boolean;
}

export type TUserModel = Model<IUser>;

export type TOnboardingProps = {
  userInfo: {
    userId: string;
    imageUrl: string;
    name: string;
    username: string;
    bio: string;
  };
  isEdit?: boolean;
};

export type TUserInfoProps = {
  userId: string;
  imageUrl: string;
  name: string;
  username: string;
  bio: string;
  isEdit?: boolean;
};

export interface IThread {
  text: string;
  createdAt: Date;
  author: Types.ObjectId;
  parentId: string;
  children: Types.ObjectId[];
  community: Types.ObjectId;
}

export type TThreadModel = Model<IThread>;

export type TCreateThreadProps = {
  userId: string;
  text: string;
  parentId?: string;
};

export type TThreadCardProps = {
  thread: any;
  isComment?: boolean;
  isThreadPage?: boolean;
  isProfilePage?: boolean;
};

export type TThreadDetailsProps = {
  params: { id: string };
};

export type TThreadPageProps = {
  id: string;
};

export type TThreadButtonsProps = {
  id: string;
};

export type TPostCommentProps = {
  parentId: string;
};

export type TThreadCommentsProps = {
  childThreads: any;
};

export type TProfileProps = {
  user: any;
  isPrivate?: boolean;
};

export type TProfileTabsProps = {
  mainThreads: any;
  replyThreads: any;
  userInfo: any;
};

export type TUserProfileProps = {
  params: { id: string };
};

export type TUsersProps = {
  users: any;
  isLoading: boolean;
};

export type TActivityProps = {
  user: any;
};

export type TCreateCommunityProps = {
  id: string | number | Record<string, string>[];
  name: string | number | Record<string, string>[];
  slug: string | number | Record<string, string>[];
  image: string | number | Record<string, string>[];
  bio: string | number | Record<string, string>[];
  createdBy: string | number | Record<string, string>[];
};

export type TUpdateCommunityInfoProps = {
  id: string | number | Record<string, string>[];
  name: string | number | Record<string, string>[];
  slug: string | number | Record<string, string>[];
  image: string | number | Record<string, string>[];
};

export interface ICommunity {
  communityId: string;
  name: string;
  slug: string;
  image: string;
  bio: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  threads: Types.ObjectId[];
}

export type TCommunityModel = Model<ICommunity>;
