import { createPuppeteerRouter } from 'crawlee';

import findAboutUsLink from './services/scrapper/findAboutUsLink.js';
import scrapParagraphs from './services/scrapper/scrapParagraphs.js';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ page, enqueueLinks, }) => {
    const href = await findAboutUsLink(page)

    await enqueueLinks({
        globs: [href],
        label: 'scrapParagraphs',
    });
});

router.addHandler('scrapParagraphs', async ({ request, page, pushData, }) => {
    const paragraphs = await scrapParagraphs(page);

    await pushData({
        url: request.url,
        text: paragraphs,
    });
});
