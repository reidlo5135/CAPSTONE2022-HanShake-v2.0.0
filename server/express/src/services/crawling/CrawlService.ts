// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require("puppeteer-core");
const URL = "https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=";

async function commonCrawl(menu_id: any, selector: string) {
  console.log("CrawlService commonCrawl menu_id : ", menu_id);
  console.log("CrawlService commonCrawl selector : ", selector);

  const browser = await puppeteer.launch({
    product: "chrome",
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 900,
    },
  });
  const page = await browser.newPage();
  console.log("URL : ", URL + menu_id);
  await page.goto(URL + menu_id);
  return await page.$(selector);
}

export = {
  commonCrawl,
};
