async function scrapLargerTexts(page) {
    const allLargeTexts = await page.$$('body *');

    
    const largeTexts = await Promise.all(allLargeTexts.map(async (p) => {
        return await p.evaluate(node => node.innerText);
    }))

    const filteredLargeTexts = largeTexts.filter(text => text?.length > 50 && text?.length < 1000);

    return filteredLargeTexts;
}

export default scrapLargerTexts;