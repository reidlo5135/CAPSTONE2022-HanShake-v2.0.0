import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import DietRouter from "../api/diet/DietRouter";
import NoticeRouter from "../api/notice/NoticeRouter";
import ScheduleRouter from "../api/schedule/ScheduleRouter";
import FacilityRouter from "../api/facility/FacilityRouter";

export default async ({ app }: { app: express.Application }) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors({ origin: "http://localhost:8080/" }));
  app.use("/v2/api/diet/", DietRouter);
  app.use("/v2/api/notice/", NoticeRouter);
  app.use("/v2/api/schedule/", ScheduleRouter);
  app.use("/v2/api/facility/", FacilityRouter);

  return app;
};
