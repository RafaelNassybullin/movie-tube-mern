import ApiError from "../exception/apiErrors";
import { Response, Request, NextFunction } from "express";

export default function errorMiddleware(err: ApiError, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
