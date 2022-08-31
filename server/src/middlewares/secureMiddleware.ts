import { Response, Request, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(res.status(400).json({ docs: [] }));
    }

    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(res.status(400).json({ docs: [] }));
    }

    const userData = accessToken;

    if (
      userData !== process.env["gsjdfnkgmdflkvmdfkjb94j39mb98j3j9m39bm938j9m9"]
    ) {
      return next(res.status(400).json({ docs: [] }));
    }

    //@ts-ignore
    req.user = userData;

    next();

  } catch {
    return next(res.status(400).json({ docs: [] }));
  }
};
