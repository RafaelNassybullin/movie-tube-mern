import { Response, Request, NextFunction } from "express";
import ApiError from "../exception/apiErrors";
import TokenService from "../service/tokenService";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    //@ts-ignore
    req.user = userData;

    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
