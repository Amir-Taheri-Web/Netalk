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
  communities: Types.ObjectId;
  threads: Types.ObjectId;
}

export type TUserModel = Model<IUser>;
