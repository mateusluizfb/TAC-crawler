import fs from 'fs';

const STORAGE_PATH = 'storage/datasets/default';

/*
    It opens the storage folder and reads all the files in it.
    Returns an array of objects, each object representing a file in the storage folder.
*/
function getStorageResults() {
    const files = fs.readdirSync(STORAGE_PATH);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    const jsonObjects = jsonFiles.map(file => {
        const fileContents = fs.readFileSync(`${STORAGE_PATH}/${file}`, 'utf8');
        return JSON.parse(fileContents);
    });

    return jsonObjects;
}

export default getStorageResults;