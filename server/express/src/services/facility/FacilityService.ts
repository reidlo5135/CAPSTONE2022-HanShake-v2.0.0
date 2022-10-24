import { ElementHandle } from "puppeteer-core";
import {BadRequestError} from "../../lib/BadRequestError";
import crawlService from "../../services/crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");

const MENU_ID: any = process.env.FACILITY_MENU_ID || 470;
// const SELECTOR: string =
//     "#contents > article > div.campusMap > ul > li.depth1 > div.depth2 > div#mCSB_3 > div#mCSB_3_container > ul > li > a";
const SELECTOR: string =
    "div#mCSB_3_container > ul > li > a";

let result = new Map<string, any[]>();

function crawlFacilityBuildingAll(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID, SELECTOR)
            .then(commonTargetCrawl)
            .then(async (response) => {
                resolve(JSON.parse(JSON.stringify(Object.fromEntries(response))));
            })
            .catch((err: Error) => {
                reject(new BadRequestError(err.message));
            });
    }));
}

async function commonTargetCrawl(response: ElementHandle) {
    const name = await response.evaluate(() =>
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

    const floor = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#mCSB_10_container > div.dropDown > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("button"),
                    (cell) => cell.textContent
                )
        )
    );

    let map = new Map<string, string>();
    for(let i=0;name.length;i++) {
        console.log("Facility Service name : ", name[i].toString());
        console.log("Facility Service floor : ", floor[i].toString());
    }

    return result;
}

export = {
    crawlFacilityBuildingAll
}