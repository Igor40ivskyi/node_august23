import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser, IUserWithoutPassword } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUserWithoutPassword[]> {
    return User.find().select("-password");
  }

  public async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }

  public async create(data: IUser): Promise<IUser> {
    return userRepository.create(data);
  }
}

export const userService = new UserService();
