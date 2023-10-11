import getStorageResults from './getStorageResults';
import cleanStorageResults from './cleanStorageResults';
import exportStorageResults from './exportStorageResults';

function storageParser() {
    const storageResults = getStorageResults();
    const cleanedStorage = cleanStorageResults(storageResults);
    const exportedStorage = exportStorageResults(cleanedStorage);

    return exportedStorage;
}

export default storageParser;