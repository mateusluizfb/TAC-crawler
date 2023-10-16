import getStorageResults from './getStorageResults.ts';
import cleanStorageResults from './cleanStorageResults.ts';
// import exportStorageResults from './exportStorageResults';

// const JSON_FILES_PATH = '../../../storage/datasets/default'

function storageParser() {
    const storageResults = getStorageResults();
    const cleanedStorage = cleanStorageResults(storageResults);
    console.log(cleanedStorage)

    // TODO:
    // const exportedStorage = exportStorageResults(cleanedStorage);
    // return exportedStorage;
}

storageParser();