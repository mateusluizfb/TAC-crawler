import fs from 'fs';

const STORAGE_PATH = 'storage/datasets/default';

/*
    Abrimos a pasta de storage e lemos todos os arquivos dentro dela.

    Retorna um array de objetos, cada objeto representa um arquivo na pasta de storage.
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