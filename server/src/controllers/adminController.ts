import { Response, Request, NextFunction } from "express";
import AdminService from "../service/adminService";
import { validationResult } from "express-validator";
import ApiError from "../exception/apiErrors"

export default class AdminController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors: any = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await AdminService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return 0
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await AdminService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return 0
      next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await AdminService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      return 0
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AdminService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 1.5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      return 0
      next(e);
    }
  }
}