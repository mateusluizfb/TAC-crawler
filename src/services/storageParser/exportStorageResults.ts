import fs from 'fs';

/*
    This function exports the data to a CSV file.

    Dado um array de objetos com a seguinte estrutura:
    {
        "url": "1",
        "text": "Jornalismo independente, democrático e para todos, Eric Nepomuceno é jornalista e escritor"
    }

    Esta função exporta os dados para um arquivo CSV.
*/
function exportStorageResults(storageResults) {
    const formattedData = storageResults.map(result => {
        const { url, text } = result;
        console.log(result)
        return `"${url}","${text}"`;
    }).join('\n');


    const nowDate = new Date();
    fs.writeFileSync(`storage/results-${nowDate.getFullYear()}-${nowDate.getMonth()}-${nowDate.getDate()}.csv`, formattedData);
}

export default exportStorageResults;