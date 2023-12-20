const SMALL_TEXT_LENGTH = 50;
const LARGER_TEXT_LENGTH = 1000;

/*
    Essa função é responsável por extrair todos os textos que são considerados "grandes" do corpo HTML.

    Por grande entende-se textos que tem mais de 50 caracteres e menos de 1000 caracteres. Isso pode e deve ser melhorado
    para uma análise mais precisa.
*/

async function scrapLargerTexts(page) {
    const allLargeTexts = await page.$$('body *');
    
    /*
        Esse código abaixo é responsável por extrair o texto de cada elemento HTML
        Aqui o puppeteer entra em ação, utilizamos ele para extrair os dados qu queremos
        usando uma sintaxe muito parecida com seletores CSS/HTML
    */
    const largeTexts = await Promise.all(allLargeTexts.map(async (p) => {
        return await p.evaluate(node => node.innerText);
    }))

    const filteredLargeTexts = largeTexts.filter(text => text?.length > SMALL_TEXT_LENGTH && text?.length < LARGER_TEXT_LENGTH);

    return filteredLargeTexts;
}

export default scrapLargerTexts;