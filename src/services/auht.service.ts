import { ApiError } from "../errors/api.error";
import { Token } from "../models/token.model";
import { User } from "../models/User.model";
import { ICredentials, ITokensPair } from "../types/token.type";
import { IUser } from "../types/user.type";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async login(
    credentials: ICredentials,
    user: IUser,
  ): Promise<ITokensPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("Invalid email or password", 401);
      }

      const tokensPair = await tokenService.generateTokenPair({
        name: user.name,
        _id: user._id,
      });

      await Token.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
