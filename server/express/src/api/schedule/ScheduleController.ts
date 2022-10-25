import { Request, Response, NextFunction } from "express";
import scheduleService from "../../services/schedule/ScheduleService";

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findScheduleAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    scheduleService.crawlScheduleAll().then(
        (resolve: Response) => {
            console.log(
                "ScheduleController findScheduleAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "ScheduleController findScheduleAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    );
});

export = {
    findScheduleAll
}