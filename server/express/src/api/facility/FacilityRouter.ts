import express from "express";
import controller from "./FacilityController";

const router = express.Router();

router.get("/building", controller.findFacilityAll);

export = router;