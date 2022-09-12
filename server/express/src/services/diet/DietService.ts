import { ElementHandle } from "puppeteer-core";
import crawlService from "../crawling/CrawlService";

const URL = "https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=1470";
const SELECTOR =
  "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody";

function crawlDietAll(): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<any>(async (resolve, reject) => {
    try {
        await crawlService
            .commonCrawl(URL, SELECTOR)
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
                resolve(result);
            })
            .catch((err: Error) => {
                reject(err);
            });
    } catch (e) {
        reject(e);
    }
  });
}

export = {
  crawlDietAll,
};
