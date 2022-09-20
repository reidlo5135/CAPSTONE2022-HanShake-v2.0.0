import { Request, Response, NextFunction } from "express";
import scholarService from "../../services/notice/scholar/ScholarNoticeService";
import andService from "../../services/notice/and/AnDNoticeService";
import bachelorService from "../../services/notice/bachelor/BachelorNoticeService";
import bidService from "../../services/notice/bid/BidNoticeService";

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findScholarNoticeAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    scholarService.crawlScholarNoticeAll().then(
        (resolve: Response) => {
            console.log(
                "NoticeController findScholarNoticeAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "NoticeController findScholarNoticeAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    );
});

const findAnDNoticeAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    andService.crawlAnDNoticeAll().then(
        (resolve: Response) => {
            console.log(
                "NoticeController findAnDNoticeAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "NoticeController findAnDNoticeAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

const findBachelorNoticeAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    bachelorService.crawlBachelorNoticeAll().then(
        (resolve: Response) => {
            console.log(
                "NoticeController findBachelorNoticeAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "NoticeController findBachelorNoticeAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

const findBidNoticeAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    bidService.crawlBidNoticeAll().then(
        (resolve: Response) => {
            console.log(
                "NoticeController findBiDNoticeAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "NoticeController findBiDNoticeAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

export = {
    findScholarNoticeAll,
    findAnDNoticeAll,
    findBachelorNoticeAll,
    findBidNoticeAll
}