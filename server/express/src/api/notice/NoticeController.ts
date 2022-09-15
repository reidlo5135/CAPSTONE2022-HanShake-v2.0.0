import { Request, Response, NextFunction } from "express";
import service from '../../services/notice/scholar/ScholarNoticeService';

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findScholarNoticeAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    service.crawlScholarNoticeAll().then(
        (resolve: Response) => {
            console.log(
                "NoticeController findNoticeAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "NoticeController findNoticeAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    );
});

export = {
    findScholarNoticeAll
}