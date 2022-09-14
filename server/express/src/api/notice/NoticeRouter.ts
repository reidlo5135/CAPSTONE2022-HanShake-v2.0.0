import express from "express";
import controller from './NoticeController';

const router = express.Router();

router.get("/", controller.findNoticeAll);

export = router;