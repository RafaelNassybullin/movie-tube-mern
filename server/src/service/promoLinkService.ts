import PromotionVastLink from "../model/promoLinkModel"
import { Response, Request } from "express";

export default class SponsorService {
  static async getSponsorVastLink(_: Request, res: Response) {
    try {
      const data = await PromotionVastLink.find().sort({ _id: -1 }).lean();
      res.json(data);
    } catch (error) {
      res.status(404).json([]);
    }
  }

  static async postSponsorVastLink(req: Request, res: Response) {
    const data = new PromotionVastLink(req.body);
    try {
      const insertedData = await data.save();
      res.status(201).json(insertedData);
    } catch (error: any) {
      res.status(400).json([{ message: error.message }]);
    }
  }
}