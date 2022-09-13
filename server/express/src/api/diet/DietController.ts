import { Request, Response } from "express";
import service from "../../services/diet/DietService";

const findDietAll = async (req: Request, res: Response) => {
  service.crawlDietAll().then(
    (resolve: Response) => {
      console.log(
        "DietController findPuppe promise stringify : ",
        resolve
      );
      res.status(200).send({ resolve });
    },
    (reject: Error) => {
      console.log(
        "DietController findPuppe promise reject : ",
        reject
      );
      res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
    }
  );
};

export = {
  findDietAll,
};
