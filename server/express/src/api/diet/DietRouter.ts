import express from "express";
import controller from "./DietController";

const router = express.Router();

router.get("/", controller.findAll);
router.get("/test", controller.findTest);

export = router;
