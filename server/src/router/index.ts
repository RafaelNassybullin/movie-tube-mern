import express from 'express';
import adminController from "../controllers/adminController"
import { body } from "express-validator"
import authMiddleware from "../middlewares/authMiddleware"
import secureMiddleware from "../middlewares/secureMiddleware"
import DataService from "../service/dataService"
import SponsorService from "../service/promoLinkService"

const router = express.Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  adminController.registration
);

router.post("/login", adminController.login);

router.post("/logout", adminController.logout);

router.get("/refresh", adminController.refresh);

router.get(
  "/movieData",
  secureMiddleware,
  DataService.getPaginationMovieData
);

router.get("/searchDatas/:search", secureMiddleware, DataService.searchDatas);

router.get("/movieData/:id", secureMiddleware, DataService.getMovieDataById);

router.get(
  "/movieData/categories/:category",
  secureMiddleware,
  DataService.getMovieDataByCategory
);

router.get(
  "/movieAdminData",
  authMiddleware,
  DataService.getPaginationMovieData
);

router.post("/movieData", authMiddleware, DataService.saveMovieData);

router.patch("/movieData/:id", authMiddleware, DataService.editMovieData);

router.delete("/movieData/:id", authMiddleware, DataService.deleteMovieData);

router.get(
  "/sponsorVastLink",
  secureMiddleware,
  SponsorService.getSponsorVastLink
);

router.post(
  "/sponsorVastLink",
  authMiddleware,
  SponsorService.postSponsorVastLink
);

router.get(
  "/random/:category",
  secureMiddleware,
  DataService.randomDataPaginate
);

export = router;