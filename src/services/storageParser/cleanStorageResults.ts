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

const VALID_TEXT_REGEX_PATTERNS = [
    // Regex to match only text that starts with a capital letter and ends with a dot.
    /[A-Z][^.]*\./g,
]

const INVALID_TEXT_REGEX_PATTENRS = [
    // Regex to match code like text
    /\/\*[^]*?\*\/|\/\/[^\r\n]*|function\s+\w*\s*\(.*\)|\b\w+\s*\(.*\)\s*{[\s\S]*}/g,
    /{[^}]*}|(var\s+\w+\s*=|const\s+\w+\s*=|let\s+\w+\s*=)[^;]*;/g,
    /{[^}]*}|(var|const|let)\s+\w+\s*=[^;]+;/g,
    /{[^}]*}/g,
]

// Sometimes the data scrapped has multiple copies, we only want to keep one
function removeDuplicates(texts) {
    return texts.filter((text, index) => texts.indexOf(text) === index)
}


function cleanStorageResults(storageResults) {
    return storageResults.map(({ url, text: texts }) => {

        const filteredTexts = texts
            .filter(text => VALID_TEXT_REGEX_PATTERNS.some(pattern => pattern.test(text)))
            .filter(text => !INVALID_TEXT_REGEX_PATTENRS.some(pattern => pattern.test(text)))
            .map(text => text.replace(/(\r\n|\n|\r)/gm, " "))
            
        const uniqueTexts = removeDuplicates(filteredTexts)

        return {
            url,
            text: uniqueTexts
        }
    })
}

export default cleanStorageResults;