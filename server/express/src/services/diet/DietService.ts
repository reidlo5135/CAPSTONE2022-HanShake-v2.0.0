import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require("cheerio");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerioTableParser = require("cheerio-tableparser");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const iconv = require("iconv-lite");

// eslint-disable-next-line consistent-return
const getHtml = async (url: string) => {
  console.log("GetHTML URL : ", url);
  try {
    return await axios({
      url,
      method: "GET",
      responseType: "arraybuffer",
    });
  } catch (err) {
    console.error(err);
  }
};

function crawlAll(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    getHtml("https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=1470").then(
      (html: any) => {
        const list: any[] = [];
        const $ = cheerio.load(iconv.decode(html.data, "UTF-8"));
        const $bodyList = $(
          "#contents > article > div > div.menu_tb > div.lineTop_tbArea.tbScroll > table > tbody"
        );
        $bodyList.each(function (i: any, elem: Element): any {
          console.log("find : ", $(elem).html());
          list[i] = {
            corner: $(elem).find("tr > #text").text(),
          };
        });

        const data = list.filter((n) => n.corner);
        console.log("DATA : ", data);
        resolve(data);
      }
    );
  });
}

function crawlTest(): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    getHtml("https://github.com/reidlo5135").then((html: any) => {
      const list: any[] = [];
      const $ = cheerio.load(iconv.decode(html.data, "UTF-8"));
      const $bodyList = $(
        "div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1"
      );
      $bodyList.each(function (i: any, elem: Element): any {
        console.log("find : ", $(elem).html());
        list[i] = {
          name: $(elem).find("span.p-name.vcard-fullname.d-block.overflow-hidden").text(),
          nickname: $(elem).find("span.p-nickname").text()
        };
      });

      const data = list.filter((n) => n.name);
      console.log("DATA : ", data);
      resolve(data);
    });
  });
}

export = {
  crawlAll,
  crawlTest
};
