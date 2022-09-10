const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async (url:String) => {
    console.log('GetHTML URL : ', url);
    try {
        return await axios.get(url);
    } catch (err) {
        console.error(err);
    }
}

function crawlAll() : Promise<any> {
    return new Promise<any>((resolve, reject) => {
        getHtml('https://www.daelim.ac.kr/cms/FrCon/index.do?MENU_ID=1470')
            .then(html => {
                let list: any[] = [];
                const $ = cheerio.load(html.data);
                const $bodyList = $('table.lineTop_tb2').children('tbody');

                $bodyList.each(function(i:any, elem:Element):any {
                    list[i] = {
                        corner: $(elem).find('tr').text(),
                    };
                });

                const data = list.filter(n => n.corner);
                console.log('DATA : ', data);
                resolve(data);
            });
    });
}

export = {
    crawlAll
}