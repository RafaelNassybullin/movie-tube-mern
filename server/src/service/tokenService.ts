import jwt from "jsonwebtoken";
import AuthToken from "../model/tokenModel";

export default class TokenService {
  static generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key", {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(payload, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key", {
      expiresIn: "30m",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key");
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static validateRefreshToken(token: any) {
    try {
      const userData = jwt.verify(token, process.env["JWT_ACCESS_SECRET"] || "jwt-secret-key");
      return userData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async saveToken(userId: any, refreshToken: any) {
    const tokenData = await AuthToken.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await AuthToken.create({ user: userId, refreshToken });
  }

  static async removeToken(refreshToken: any) {
    return AuthToken.deleteOne({ refreshToken });
  }

  static async findToken(refreshToken: any) {
    return AuthToken.find({ refreshToken });
  }
}