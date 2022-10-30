import { ElementHandle } from "puppeteer-core";
import {BadRequestError} from "../../lib/BadRequestError";
import crawlService from "../../services/crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");

const MENU_ID: any = process.env.FACILITY_MENU_ID || 470;
const SELECTOR: string =
    "div#mCSB_3_container > ul > li > a";

function crawlBuilding(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID, SELECTOR)
            .then(buildingTargetCrawl)
            .then(async (response) => {
                resolve(JSON.parse(JSON.stringify(Object.fromEntries(response))));
            })
            .catch((err: Error) => {
                reject(new BadRequestError(err.message));
            });
    }));
}

function crawlDepartment(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID, SELECTOR)
            .then(departmentTargetCrawl)
            .then(async (response) => {
                resolve(JSON.parse(JSON.stringify(Object.fromEntries(response))));
            })
            .catch((err: Error) => {
                reject(new BadRequestError(err.message));
            });
    }));
}

function crawlWelfare(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID, SELECTOR)
            .then(welfareTargetCrawl)
            .then(async (response) => {
                resolve(JSON.parse(JSON.stringify(Object.fromEntries(response))));
            })
            .catch((err: Error) => {
                reject(new BadRequestError(err.message));
            });
    }));
}

async function buildingTargetCrawl(response: ElementHandle) {
    const building = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#mCSB_3_container > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("a"),
                    (cell) => cell.textContent
                )
        )
    );

    let result = new Map<string, any[]>();
    let buildingArr: string[] = [];

    for(let i=0;i<building.length;i++) {
        buildingArr.push(building[i].toString());
    }
    result.set("building", buildingArr);

    return result;
}

async function departmentTargetCrawl(response: ElementHandle) {
    const department = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#mCSB_4_container > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("a"),
                    (cell) => cell.textContent
                )
        )
    );

    let result = new Map<string, any[]>();
    let departmentArr: string[] = [];

    for(let j=0;j<department.length;j++) {
        departmentArr.push(department[j].toString());
    }
    result.set("department", departmentArr);

    return result;
}

async function welfareTargetCrawl(response: ElementHandle) {
    const welFare = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#mCSB_5_container > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("a"),
                    (cell) => cell.textContent
                )
        )
    );

    let result = new Map<string, any[]>();
    let welfareArr: string[] = [];

    for(let k=0;k<welFare.length;k++) {
        welfareArr.push(welFare[k].toString());
    }
    result.set("welfare", welfareArr);

    return result;
}


export = {
    crawlBuilding,
    crawlDepartment,
    crawlWelfare
}