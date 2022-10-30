import express from "express";
import controller from "./FacilityController";

const router = express.Router();

router.get("/building", controller.findBuildingAll);
router.get("/department", controller.findDepartmentAll);
router.get("/welfare", controller.findWelfareAll);

export = router;