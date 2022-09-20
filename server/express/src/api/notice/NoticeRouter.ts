import express from "express";
import controller from './NoticeController';

const router = express.Router();

router.get("/scholar", controller.findScholarNoticeAll);
router.get("/and", controller.findAnDNoticeAll);
router.get("/bachelor", controller.findBachelorNoticeAll);
router.get("/bid", controller.findBidNoticeAll);

export = router;