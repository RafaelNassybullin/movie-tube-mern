import MoviesData from "../model/dataModel"
import { Response, Request } from "express";
import { PageLimit } from "../interface";

export default class DataService {
  static async getPaginationMovieData(req: Request<{}, {}, {}, PageLimit>, res: Response) {
    try {
      if (req.query.page && req.query.limit) {
        //@ts-ignore
        MoviesData.paginate(
          {},
          {
            page: req.query.page,
            limit: req.query.limit,
            sort: { _id: -1 },
            lean: true,
          }
        )
        //@ts-ignore
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res.status(400).json([]);
          });
      } else {
        const data = await MoviesData.find();
        res.status(200).json(data);
      }
    } catch {
      res.status(500).json([]);
    }
  }

  static async getMovieDataById(req: Request<PageLimit, {}, {}, {}>, res: Response) {
    try {
      const data = await MoviesData.findById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json([]);
    }
  }

  static async saveMovieData(req: Request, res: Response) {
    const data = new MoviesData(req.body);
    try {
      const insertedData = await data.save();
      res.status(201).json(insertedData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async editMovieData(req: Request<PageLimit, {}, {}, {}>, res: Response) {
    try {
      const updatedMovieData = await MoviesData.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      res.status(200).json(updatedMovieData);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteMovieData(req: Request<PageLimit, {}, {}, {}>, res: Response) {
    try {
      const deleteMovieData = await MoviesData.deleteOne({
        _id: req.params.id,
      });
      res.status(200).json(deleteMovieData);
    } catch (error) {
      res.status(400).json(["error"]);
    }
  }

  static async getMovieDataByCategory(req: Request<PageLimit, {}, {}, PageLimit>, res: Response) {
    const { category } = req.params;
    try {
      if (req.query.page && req.query.limit) {
        //@ts-ignore
        MoviesData.paginate(
          { category },
          {
            page: req.query.page,
            limit: req.query.limit,
            sort: { _id: -1 },
            lean: true,
          }
        )
        //@ts-ignore
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res.status(400).json({ message: "Error" });
          });
      } else {
        res.status(400).json({ message: "Error" });
      }
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async randomDataPaginate(req: Request<PageLimit, {}, {}, PageLimit>, res: Response) {
    const { category } = req.params;
    try {
      if (req.query.page && req.query.limit) {
        const aggregate = MoviesData.aggregate([
          { $match: { category } },
          { $sample: { size: 24 } },
        ]);
//@ts-ignore
        MoviesData.aggregatePaginate(aggregate, {
          page: req.query.page,
          limit: req.query.limit,
        })
        //@ts-ignore
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res
              .status(400)
              .json({ message: "ERROR!!!! Bearer auth token is invalid!" });
          });
      } else {
        res
          .status(400)
          .json({ message: "ERROR!!!! Set page and limit query!" });
      }
    } catch {
      res.status(500).json([
        {
          message:
            "ERROR!!!! Server is not available, please check domain or valid cors port",
        },
      ]);
    }
  }

  static async searchDatas(req: Request<PageLimit, {}, {}, PageLimit>, res: Response) {
    const { search } = req.params;
    try {
      if (req.query.page && req.query.limit) {
        //@ts-ignore
        MoviesData.paginate(
          { $text: { $search: `${search}` } },
          {
            page: req.query.page,
            limit: req.query.limit,
            sort: { _id: -1 },
            lean: true,
          }
        )
        //@ts-ignore
          .then((data) => {
            res.status(200).json(data);
          })
          .catch(() => {
            res.status(400).json({ message: "Error" });
          });
      } else {
        res.status(400).json({ message: "Error" });
      }
    } catch {
      res.status(500).json([{ message: "Error" }]);
    }
  }
}