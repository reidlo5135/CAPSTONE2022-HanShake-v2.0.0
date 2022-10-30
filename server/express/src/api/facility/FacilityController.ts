import { Request, Response, NextFunction } from "express";
import facilityService from "../../services/facility/FacilityService";

const {asyncWrapper} = require("../../middlewares/AsyncWrapper");

const findBuildingAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    facilityService.crawlBuilding().then(
        (resolve: Response) => {
            console.log(
                "FacilityController findBuildingAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "FacilityController findBuildingAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

const findDepartmentAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    facilityService.crawlDepartment().then(
        (resolve: Response) => {
            console.log(
                "FacilityController findDepartmentAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "FacilityController findDepartmentAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

const findWelfareAll = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
    facilityService.crawlWelfare().then(
        (resolve: Response) => {
            console.log(
                "FacilityController findWelfareAll promise resolved : ",
                resolve
            );
            res.status(200).send({ resolve });
        },
        (reject: Error) => {
            console.log(
                "FacilityController findWelfareAll promise rejected : ",
                reject
            );
            res.send({ code: -1, message: "failed", error: JSON.stringify(reject) });
        }
    )
});

export = {
    findBuildingAll,
    findDepartmentAll,
    findWelfareAll
}