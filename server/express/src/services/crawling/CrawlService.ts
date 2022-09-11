// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require("puppeteer-core");

async function commonCrawl(url: string, selector: string) {
  console.log(
    "CrawlService commonCrawl url : ",
    url,
    ", selector : ",
    selector
  );
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
  await page.goto(url);
  return await page.$(selector);
}

export = {
  commonCrawl,
};
