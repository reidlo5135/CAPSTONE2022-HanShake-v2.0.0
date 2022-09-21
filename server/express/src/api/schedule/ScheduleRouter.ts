import express from "express";
import controller from "./ScheduleController";

const router = express.Router();

router.get("/", controller.findScheduleAll);

export = router;

