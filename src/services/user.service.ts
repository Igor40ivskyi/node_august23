import { ApiError } from "../errors/api.error";
import { User } from "../models/User.model";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return User.find();
  }

  public async findById(id: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(id);
  }

  public async create(data: IUser): Promise<IUser> {
    return userRepository.create(data);
  }

  public async updateById(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findOneAndUpdate(
      { _id: userId },
      { ...data },
      {
        returnDocument: "after",
      },
    );
  }

  public async deleteById(userId: string): Promise<void> {
    await this.getOneByIdOrThrow(userId);

    await User.deleteOne({ _id: userId });
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }
}

export const userService = new UserService();
