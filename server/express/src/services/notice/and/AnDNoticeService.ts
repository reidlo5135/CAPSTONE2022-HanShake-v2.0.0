/**
 * @author reidlo
 * @version 2.0.0
 * 2022-09-15
 */
import { ElementHandle } from "puppeteer-core";
import { BadRequestError } from "../../../lib/BadRequestError";
import crawlService from "../../crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../../middlewares/AsyncWrapper");
const MENU_ID: any = process.env.NOTICE_AND_MENU_ID || 30;
const SELECTOR: string =
    "#contents > article > div > div.lineList_ul > ul";

let result = new Map<string, any[]>();

function crawlAnDNoticeAll(): Promise<any> {
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
    const number = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("span.mark_num > span"),
                    (cell) => cell.textContent
                )
        )
    );

    const title = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("div.txtL > a"),
                    (cell) => cell.textContent
                )
        )
    );

    const href = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("div.txtL > a"),
                    (cell) => cell.getAttribute("href")
                )
        )
    );

    const writer = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("div.txtInfo > span.writer"),
                    (cell) => cell.textContent
                )
        )
    );

    const date = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("div.txtInfo > span.date"),
                    (cell) => cell.textContent
                )
        )
    );

    const view = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("div.txtInfo > span.view"),
                    (cell) => cell.textContent
                )
        )
    );

    let map = new Map<string, string>();
    for (let i=0;i<number.length;i++) {
        map.set("title", title[i].toString());
        map.set("url", "https://www.daelim.ac.kr" + href[i].toString());
        map.set("writer", writer[i].toString());
        map.set("regDate", date[i].toString());
        map.set("views", view[i].toString().split("조회")[1]);
        result.set(number[i].toString(), JSON.parse(JSON.stringify(Object.fromEntries(map))));
    }
    return result;
}

export = {
    crawlAnDNoticeAll
}