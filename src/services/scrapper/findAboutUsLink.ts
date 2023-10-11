const PATTERNS = [
    'Quem somos',
    'Quem Somos',
]

async function findAboutUsLink(page) {
    const anchors = await page.$$('a');

    for (const anchor of anchors) {
        const text = await anchor.evaluate(node => node.innerText);
        if (PATTERNS.includes(text)) {
            const href = await anchor.evaluate(node => node.href);

            return href;
        }
    }
}

export default findAboutUsLink;