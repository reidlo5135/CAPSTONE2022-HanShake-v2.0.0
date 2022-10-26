import { ElementHandle } from "puppeteer-core";
import {BadRequestError} from "../../lib/BadRequestError";
import crawlService from "../../services/crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");

const MENU_ID: any = process.env.FACILITY_MENU_ID || 470;
const SELECTOR: string =
    "div#mCSB_3_container > ul > li > a";

let result = new Map<string, any[]>();

function crawlFacilityAll(): Promise<any> {
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

    result.set("building", building);
    result.set("department", department);
    result.set("welfare", welFare);

    return result;
}

export = {
    crawlFacilityAll
}