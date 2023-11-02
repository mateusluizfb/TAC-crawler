import 'dotenv/config'

import getStorageResults from './getStorageResults.ts';
import cleanStorageResults from './cleanStorageResults.ts';
import extractAboutUsText from './extractAboutUsText.ts';
import exportStorageResults from './exportStorageResults.ts';

async function storageParser() {
    const storageResults = getStorageResults();
    const cleanedStorage = cleanStorageResults(storageResults);
    const extractedAboutUsText = extractAboutUsText(cleanedStorage);
    // return exportStorageResults(cleanedStorage)
}

storageParser();