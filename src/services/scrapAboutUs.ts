const PATTERNS = [
    'Quem somos',
    'Quem Somos',
]

// iterate over all paragraphs and return the biggest one
// extracts the biggest paragraph from the page
async function scrapAboutUs(page) {
    const allParagraphs = await page.$$('p');

    const aboutUsParagraphs = await Promise.all(allParagraphs.map(async (p) => {
        return await p.evaluate(node => node.innerText);
    }));

    return aboutUsParagraphs;
}

export default scrapAboutUs;