import 'dotenv/config'

import getStorageResults from './getStorageResults.ts';
import cleanStorageResults from './cleanStorageResults.ts';
import extractAboutUsText from './extractAboutUsText.ts';
import exportStorageResults from './exportStorageResults.ts';

/*
    Uma vez que o crawler terminou de executar, ele vai gerar vários datasets na pasta /storage/datasets/default.
    Então temos que buscar esses dados, limpar e extrair apenas o texto "Sobre Nós" de cada site.

    Essa função é responsável por fazer isso em etapas e no fim exportar esses dados para uma planilha criada na pasta /storage
*/
async function storageParser() {
    const storageResults = getStorageResults();
    const cleanedStorage = cleanStorageResults(storageResults);
    const extractedAboutUsText = await extractAboutUsText(cleanedStorage);
    return exportStorageResults(extractedAboutUsText)
}

storageParser();