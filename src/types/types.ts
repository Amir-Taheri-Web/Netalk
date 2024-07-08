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
};

export type TProfileTabsProps = {
  mainThreads: any;
  replyThreads: any;
  userInfo: any;
};
