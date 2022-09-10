import { Request, Response } from "express";
import service from "../../services/diet/DietService";

const findAll = async (req: Request, res: Response) => {
  service.crawlAll().then(
    (resolve: Response) => {
      console.log(
        "DietController findAll promise stringify : ",
        JSON.stringify(resolve)
      );
      res.status(200).send({ code: 0, message: "success", data: resolve });
    },
    (reject: Error) => {
      console.log(
        "DietController findAll promise reject : ",
        JSON.stringify(reject)
      );
      res.send({ code: -1, message: "failed", error: reject });
    }
  );
};

export = {
  findAll,
};
