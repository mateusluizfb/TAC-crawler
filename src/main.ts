// For more information, see https://crawlee.dev/
import { PuppeteerCrawler, log } from 'crawlee';

import { router } from './routes.js';
import newsSites from './fixtures/newsSites.json' assert { type: "json" };


/*
    A transformação abaixo é responsável por pegar apenas os links de cada site. 
    Todos os sites disponibilizados no arquivo newsSites.json vieram da planilha de midias
    indepentens feitas em TAC. 
*/
const startUrls = newsSites
    .map(({ aboutUsUrl }) => aboutUsUrl) // Busca apenas a url de cada site
    .map((url) => url.match(/(http|https):\/\/[^\s]+/g)) // Aplica uma regex para pegar apenas os links
    .filter((url) => url !== null) // Remove os links que não foram encontrados
    .flat(); // Transforma o array de arrays em um array simples

const crawler = new PuppeteerCrawler({
    requestHandler: router,
    headless: false, // Para ver o que está acontecendo no browser, deixe como false, caso contrário, deixe como true
});

// Inicia o crawler nas urls limpas e transformadas
await crawler.run(startUrls);
