// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, log } from 'crawlee';

import { router } from './routes.js';

const startUrls = [
    'https://www.brasil247.com/'
];

const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: false,
});

await crawler.run(startUrls);
