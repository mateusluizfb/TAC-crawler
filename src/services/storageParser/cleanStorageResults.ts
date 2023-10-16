/*
    Given an array of objects with the following structure:
    {
        "url": "1",
        "text": [
            "Jornalismo independente, democrático e para todos",
            "Eric Nepomuceno é jornalista e escritor",
        ]
    }

    This function removes the unrelevant data from each object, keeping only the ones relevant for
    the analysis, in this case, the "About Us" text.
*/
function cleanStorageResults(storageResults) {
    return storageResults.map(({ url, text: texts }) => {
        
        const textPattern = /[A-Z][^.]*\./g
        const codePattern = /\/\*[^]*?\*\/|\/\/[^\r\n]*|function\s+\w*\s*\(.*\)|\b\w+\s*\(.*\)\s*{[\s\S]*}/g 
        const codePattern2 = /{[^}]*}|(var\s+\w+\s*=|const\s+\w+\s*=|let\s+\w+\s*=)[^;]*;/g
        const codePattern3 = /{[^}]*}|(var|const|let)\s+\w+\s*=[^;]+;/g
        const cssPattern =  /{[^}]*}/g
        const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g

        const filteredTexts = texts
            .filter(text => textPattern.test(text))
            .filter(text => !codePattern.test(text))
            .filter(text => !codePattern2.test(text))
            .filter(text => !codePattern3.test(text))
            .filter(text => !cssPattern.test(text))
            .filter(text => !emailPattern.test(text))
            .map(text => text?.replace(/\n/g, ''))
            .map(text => text?.replace(/\t/g, ''))
        
        return {
            url,
            text: filteredTexts
        }
    })

}

export default cleanStorageResults;