/*
This function scraps all the texts that are considered "large" from the whole HTML body. So we keep only relevant information.
*/

const SMALL_TEXT_LENGTH = 50;
const LARGER_TEXT_LENGTH = 1000;

async function scrapLargerTexts(page) {
    const allLargeTexts = await page.$$('body *');
    
    const largeTexts = await Promise.all(allLargeTexts.map(async (p) => {
        return await p.evaluate(node => node.innerText);
    }))

    const filteredLargeTexts = largeTexts.filter(text => text?.length > SMALL_TEXT_LENGTH && text?.length < LARGER_TEXT_LENGTH);

    return filteredLargeTexts;
}

export default scrapLargerTexts;