import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async create(data: IUser): Promise<IUser> {
    return (await User.create(data)) as IUser;
  }
}

export const userRepository = new UserRepository();
