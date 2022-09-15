/**
 * @author reidlo
 * @version 2.0.0
 * 2022-09-15
 */
import { ElementHandle } from "puppeteer-core";
import { BadRequestError } from "../../lib/BadRequestError";
import crawlService from "../crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");
const MENU_ID: any = process.env.NOTICE_MENU_ID || 990;
const SELECTOR: string =
    "#contents > article > div > div.lineList_ul > ul";

let result = new Map<string, any[]>();

function crawlNoticeAll(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID + "&CONTENTS_NO=1", SELECTOR)
            .then(commonTargetCrawl)
            .then(async (response) => {
                await crawlService
                    .commonCrawl(MENU_ID + "&CONTENTS_NO=2", SELECTOR)
                    .then(commonTargetCrawl);
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

    const category = await response.evaluate(() =>
        Array.from(
            document.querySelectorAll(
                "#contents > article > div > div.lineList_ul > ul > li"
            ),
            (row) =>
                Array.from(
                    row.querySelectorAll("span.mark_categ"),
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

    let arr: any[] = [];
    for (let i=0;i<number.length;i++) {
        arr = [
            category[i].toString(),
            title[i].toString(),
            "https://daelim.ac.kr" + href[i].toString(),
            writer[i].toString(),
            date[i].toString(),
            view[i].toString().split("조회 ")[1]
        ];
        result.set(number[i].toString(), arr);
    }
    return result;
}

export = {
    crawlNoticeAll
}