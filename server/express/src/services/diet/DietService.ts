import axios from "axios";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require("cheerio");
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
        const $bodyList = $("table.lineTop_tb2 tbody");
        $bodyList.each(function (i: any, elem: Element): any {
          console.log("find : ", $(elem).html());
          list[i] = {
            corner: $(elem).find("tr:nth-of-type(1) > th").text(),
          };
        });

        const data = list.filter((n) => n.corner);
        console.log("DATA : ", data);
        resolve(data);
      }
    );
  });
}

export = {
  crawlAll,
};
