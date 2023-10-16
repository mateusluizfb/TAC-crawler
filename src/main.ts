// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, log } from 'crawlee';

import { router } from './routes.js';
import newsSites from './fixtures/newsSites.json' assert { type: "json" };

const startUrls = newsSites
        .map(({ aboutUsUrl }) => aboutUsUrl)
        .map((url) => url.match(/(http|https):\/\/[^\s]+/g))
        .filter((url) => url !== null)
        .flat();

const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: true,
});

await crawler.run(startUrls);
