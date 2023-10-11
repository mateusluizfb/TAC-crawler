const PATTERNS = [
    'Quem somos',
    'Quem Somos',
]

/*

It returns all the paragraphs in the page.

*/
async function scrapParagraphs(page) {
    const allParagraphs = await page.$$('p');

    const aboutUsParagraphs = await Promise.all(allParagraphs.map(async (p) => {
        return await p.evaluate(node => node.innerText);
    }));

    return aboutUsParagraphs;
}

export default scrapParagraphs;