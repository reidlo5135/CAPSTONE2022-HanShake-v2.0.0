import express from "express";
import controller from "./FacilityController";

const router = express.Router();

router.get("/", controller.findFacilityAll);

export = router;