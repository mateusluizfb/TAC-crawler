import getStorageResults from './getStorageResults.ts';
import cleanStorageResults from './cleanStorageResults.ts';
import exportStorageResults from './exportStorageResults.ts';

function storageParser() {
    const storageResults = getStorageResults();
    const cleanedStorage = cleanStorageResults(storageResults);
    return exportStorageResults(cleanedStorage)
}

storageParser();