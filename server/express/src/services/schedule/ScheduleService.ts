import { ElementHandle } from "puppeteer-core";
import {BadRequestError} from "../../lib/BadRequestError";
import crawlService from "../../services/crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");

const MENU_ID: any = process.env.SCHEDULE_MENU_ID || 930;
const SELECTOR: string =
    "#contents > article > div.academicCal > div > ul.calList_con";

let result = new Map<string, any[]>();

function crawlScheduleAll(): Promise<any> {
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

async function commonTargetCrawl (response: ElementHandle) {
    const date = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div > ul.calList_con > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("strong"),
                    (cell) => cell.textContent
                )
        )
    );

    const type = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div > ul.calList_con > li > p"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("span.sort"),
                    (cell) => cell.textContent
                )
        )
    );

    const details = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div > ul.calList_con > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("p"),
                    (cell) => cell.textContent
                )
        )
    );

    let map = new Map<string, string>();
    for (let i=0;i<date.length;i++) {
        map.set("type", type[i].toString());
        map.set("details", details[i].toString());
        result.set(date[i].toString(), JSON.parse(JSON.stringify(Object.fromEntries(map))));
    }
    return result;
}

export = {
    crawlScheduleAll
}