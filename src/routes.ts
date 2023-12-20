import { createPuppeteerRouter } from 'crawlee';

import scrapLargerTexts from './services/scrapper/scrapLargerTexts.js';

export const router = createPuppeteerRouter();

/*
Para cada site que o crawler acessar (startUrls na main.ts), ele vai executar o código abaixo.
*/
router.addDefaultHandler(async ({ request, page, pushData, }) => {
    const largerTexts = await scrapLargerTexts(page); // Busca apenas textos maiores dentro do html do site

    // Esse dado é guardado para ser utilizado depois no parse de dados
    // Ele vai ser guardado na pasta /storage/datasets/default quando o crawler terminar
    await pushData({
        url: request.url,
        text: largerTexts,
    });
});
