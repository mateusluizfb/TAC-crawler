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

const FILTER_TEXT_REGEX_PATTENRS = [
    // Various regex patterns matching code-like text
    /(\r\n|\n|\r)/gm,
    /<iframe[^>]*>(.*?)<\/iframe>/g,
    /\.(\w+)(\s*\.\1:(hover|visited|active|focus))+/g,
    /\/\*[^]*?\*\/|\/\/[^\r\n]*|function\s+\w*\s*\(.*\)|\b\w+\s*\(.*\)\s*{[\s\S]*}/g,
    /{[^}]*}|(var\s+\w+\s*=|const\s+\w+\s*=|let\s+\w+\s*=)[^;]*;/g,
    /{[^}]*}|(var|const|let)\s+\w+\s*=[^;]+;/g,
    /{[^}]*}/g,
    /\b\w+(\.\w+)*\s*\([^)]*\)/g,
    /\b\w+\s*\([^)]*\)/g,
    /\[\s*(\d+\s*,\s*)*\d+\s*\]/g,
]

// Sometimes the data scrapped has multiple copies, we only want to keep one
function removeDuplicatedItems(texts) {
    return texts.filter((text, index) => texts.indexOf(text) === index)
}

function removeInvalidTexts(text) {
    let cleanedText = text

    for (const pattern of FILTER_TEXT_REGEX_PATTENRS) {
        cleanedText = cleanedText.replace(pattern, '')
    }

    return cleanedText
}

function cleanStorageResults(storageResults) {    
    return storageResults.map(({ url, text: texts }) => {

        const uniqueTexts = removeDuplicatedItems(texts)
        const normalizedText = uniqueTexts.join(' ')
        const cleanedText = removeInvalidTexts(normalizedText)

        return {
            url,
            text: cleanedText
        }
    })
}

export default cleanStorageResults;