import { createPuppeteerRouter } from 'crawlee';

import scrapLargerTexts from './services/scrapper/scrapLargerTexts.js';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ request, page, pushData, }) => {
    const largerTexts = await scrapLargerTexts(page);

    await pushData({
        url: request.url,
        text: largerTexts,
    });
});
