import dotenv from 'dotenv';
import express, { Response, Request, NextFunction, Express } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import router from "./router";
import { MONGO_OPTIONS } from "./config";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();
const PORT = process.env["PORT"] || 7777;
const DB_URL = process.env["DB_URL"] || "mongodb+srv://rafael:rafael@cluster0.ksvub.mongodb.net/?retryWrites=true&w=majority";

const app: Express = express();

function customHeaders(_: Request, res: Response, next: NextFunction) {
  app.disable("x-powered-by");
  res.setHeader("X-Powered-By", "Apache 1996");
  next();
}

app.use(customHeaders);
app.use(express.json());
app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  const admin = process.env["ADMIN_URL"] || "http://localhost:3001";
  const users = process.env["CLIENT_URL"] || "http://localhost:3000";

  const allowedOrigins: string[] = [admin, users];

  const origin:any = req.headers.origin;

  console.log(origin)

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, OPTIONS, PUT, DELETE"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  return next();
});

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, MONGO_OPTIONS);
    app.listen(PORT, () =>
      console.log("DEV SERVER IS SUCCESSFULLY STARTED :)")
    );
  } catch (e) {
    console.log(e);
  }
};

start();
