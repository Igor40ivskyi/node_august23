import { Document, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  gender?: string;
  email: string;
  password: string;
}

export type UserType = IUser & Document;
