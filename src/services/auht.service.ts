import { EEmailActions } from "../enums/email.enum";
import { ApiError } from "../errors/api.error";
import { OldPassword } from "../models/oldPassword.model";
import { Token } from "../models/token.model";
import { User } from "../models/User.model";
import { ICredentials, ITokenPayload, ITokensPair } from "../types/token.type";
import { IUser } from "../types/user.type";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuhtService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);

      await User.create({ ...data, password: hashedPassword });

      await emailService.sendEmail(data.email, EEmailActions.WELCOME, {
        name: data.name,
        url: "http://localhost:5541/activate-account/jwtToken",
      });
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
        _id: user._id,
        name: user.name,
      });

      await Token.create({ ...tokensPair, _userId: user._id });

      return tokensPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    payload: ITokenPayload,
    entity: ITokensPair,
  ): Promise<ITokensPair> {
    try {
      const tokenPair = tokenService.generateTokenPair(payload);

      Promise.all([
        Token.deleteOne({ refreshToken: entity.refreshToken }),
        Token.create({ _userId: payload._id, ...tokenPair }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    dto: { newPassword: string; oldPassword: string },
    userId: string,
  ) {
    try {
      const user = await User.findById(userId);

      const isMatched = await passwordService.compare(
        dto.oldPassword,
        user.password,
      );

      if (!isMatched) {
        throw new ApiError("old password is wrong", 400);
      }

      const oldPasswords = await OldPassword.find({ _userId: userId });

      oldPasswords.map(async ({ password: hash }) => {
        passwordService.compare(dto.newPassword, hash);
      });

      const newHash = await passwordService.hash(dto.newPassword);

      await Promise.all([
        User.updateOne({ _id: userId }, { password: newHash }),
        OldPassword.create({ password: user.password, _userId: userId }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuhtService();
