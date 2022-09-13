import { Request, Response, NextFunction } from "express";
import service from "../../services/diet/DietService";

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findDietAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
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
});

export = {
  findDietAll,
};
