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
};

export type TUserInfoProps = {
  userId: string;
  imageUrl: string;
  name: string;
  username: string;
  bio: string;
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
