import { ElementHandle } from "puppeteer-core";
import { BadRequestError } from "../../lib/BadRequestError";
import crawlService from "../crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");
const MENU_ID: any = process.env.NOTICE_MENU_ID || 990;
const CONTENTS_NO: any = process.env.NOTICE_CONTENTS_NO || 1;
const SELECTOR: string =
    "#contents > article > div > div.lineList_ul > ul";

function crawlNoticeAll(): Promise<any> {
    return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
        await crawlService
            .commonCrawl(MENU_ID, SELECTOR)
            .then(async (response: ElementHandle) => {
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

                let arr: any[] = [];
                let result = new Map<string, any[]>();
                for (let i=0;i<number.length;i++) {
                    arr = [category[i].toString(), title[i].toString(), "https://daelim.ac.kr" + href[i].toString()];
                    result.set(number[i].toString(), arr);
                }
                resolve(JSON.parse(JSON.stringify(Object.fromEntries(result))));
            })
            .catch((err: Error) => {
                reject(new BadRequestError(err.message));
            });
    }));
}

export = {
    crawlNoticeAll
}