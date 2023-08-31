import { User } from "../models/User.model";
import { IUser, UserType } from "../types/user.type";

class UserRepository {
  public async create(data: IUser): Promise<UserType> {
    return await User.create(data);
  }
}

export const userRepository = new UserRepository();
