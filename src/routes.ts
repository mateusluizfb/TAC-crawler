import { createPuppeteerRouter } from 'crawlee';
import findAboutUsLink from './services/findAboutUsLink.js';
import scrapAboutUs from './services/scrapAboutUs.js';

export const router = createPuppeteerRouter();

router.addDefaultHandler(async ({ page, enqueueLinks, }) => {
    const href = await findAboutUsLink(page)

    await enqueueLinks({
        globs: [href],
        label: 'scrapInfo',
    });
});

router.addHandler('scrapInfo', async ({ request, page, pushData, }) => {
    const aboutUsParagraphs = await scrapAboutUs(page);

    await pushData({
        url: request.url,
        text: aboutUsParagraphs,
    });
});
