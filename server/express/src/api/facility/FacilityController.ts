import { Request, Response, NextFunction } from "express";
import facilityService from "../../services/facility/FacilityService";

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findFacilityBuildingAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    facilityService.crawlFacilityBuildingAll().then(
        (resolve: Response) => {
            console.log(
                "FacilityController findFacilityAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "FacilityController findFacilityAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

export = {
    findFacilityBuildingAll
}