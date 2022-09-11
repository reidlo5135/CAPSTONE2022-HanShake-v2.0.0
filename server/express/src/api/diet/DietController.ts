import { Request, Response } from "express";
import service from "../../services/diet/DietService";

const findDietAll = async (req: Request, res: Response) => {
  service.crawlDietAll().then(
    (resolve: Response) => {
      console.log(
        "DietController findPuppe promise stringify : ",
        JSON.stringify(resolve)
      );
      res.status(200).send({ code: 0, message: "success", data: resolve });
    },
    (reject: Error) => {
      console.log(
        "DietController findPuppe promise reject : ",
        JSON.stringify(reject)
      );
      res.send({ code: -1, message: "failed", error: reject });
    }
  );
};

export = {
  findDietAll,
};
