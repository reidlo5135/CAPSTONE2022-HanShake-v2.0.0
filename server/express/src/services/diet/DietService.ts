import { ElementHandle } from "puppeteer-core";
import crawlService from "../crawling/CrawlService";
import dotenv from 'dotenv';

dotenv.config();

const {promiseWrapper} = require("../../middlewares/AsyncWrapper");

const MENU_ID: any = process.env.DIET_MENU_ID || 1470;
const SELECTOR: string =
  "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody";

function crawlDietAll(): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<any>(promiseWrapper(async (resolve: any, reject: any) => {
      await crawlService
          .commonCrawl(MENU_ID, SELECTOR)
          .then(async (response: ElementHandle) => {
              const th = await response.evaluate(() =>
                  Array.from(
                      document.querySelectorAll(
                          "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody > tr"
                      ),
                      (row) =>
                          Array.from(
                              row.querySelectorAll("th"),
                              (cell) => cell.textContent
                          )
                  )
              );

              const td = await response.evaluate(() =>
                  Array.from(
                      document.querySelectorAll(
                          "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody > tr"
                      ),
                      (row) =>
                          Array.from(
                              row.querySelectorAll("td"),
                              (cell) => cell.textContent
                          )
                  )
              );

              let result = new Map<string, any[]>();
              for(let i=0;i<td.length;i++) {
                  result.set(th[i].toString(), td[i]);
              }
              for(const key of result.keys()) {
                  console.log(`KEY : ${key}`);
                  console.log(`result : ${result.get(key)}`);
              }
              const json = JSON.stringify(Object.fromEntries(result));
              resolve(JSON.parse(json));
          })
          .catch((err: Error) => {
              reject(err);
          });
  }));
}

export = {
  crawlDietAll,
};
