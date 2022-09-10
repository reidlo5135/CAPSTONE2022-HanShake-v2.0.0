import express from "express";
import controller from "./DietController";

const router = express.Router();

router.get("/", controller.findAll);

export = router;
