import AdminAuth from "../model/adminModel"
import bcrypt from "bcrypt"
import TokenService from "./tokenService"
import AdminDto from "../dtos/adminDto"
import ApiError from "../exception/apiErrors"

export default class AdminService {
  static async registration(email: string, password: string) {
    const candidate = await AdminAuth.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await AdminAuth.create({ email, password: hashPassword });

    const userDto = new AdminDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  static async login(email: string, password: string) {
    const user = await AdminAuth.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }
    const userDto = new AdminDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken: any) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  static async refresh(refreshToken: any) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData: any = await TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await AdminAuth.findById(userData.id);
    const userDto = new AdminDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}