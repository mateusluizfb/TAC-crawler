import fs from 'fs';

/*
    Given an array of objects with the following structure:
    {
        "url": "1",
        "text": [
            "Jornalismo independente, democrático e para todos",
            "Eric Nepomuceno é jornalista e escritor",
        ]
    }

    This function exports the data to a CSV file.
*/
function exportStorageResults(storageResults) {
    const formattedData = storageResults.map(result => {
        const { url, text } = result;
        console.log(result)
        return `"${url}","${text}"`;
    }).join('\n');

    fs.writeFileSync('storage/results.csv', formattedData);
}

export default exportStorageResults;