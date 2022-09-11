import crawlService from "../crawling/CrawlService";
import {ElementHandle} from "puppeteer-core";

const URL = "https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=1470";
const SELECTOR = "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody";

function crawlDietAll(): Promise<any> {
  return new Promise<any>(async (resolve, reject) => {
    await crawlService.commonCrawl(URL, SELECTOR).then(
        async (response:ElementHandle) => {
          const table = await response.evaluate(
              () => Array.from(
                  document.querySelectorAll("#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody > tr"),
                  row => Array.from(row.querySelectorAll('th, td'), cell => cell.textContent)
              )
          );
          console.log("Table : ", table);
          resolve(table);
        }
    ).catch((err:Error) => {reject(err)});
  });
}

export = {
  crawlDietAll
};
