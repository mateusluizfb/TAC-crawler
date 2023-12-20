/*
Dado um array de objetos com a seguinte estrutura:
{
    "url": "1",
    "text": [
        "Jornalismo independente, democrático e para todos",
        "Eric Nepomuceno é jornalista e escritor",
    ]
}

Esta função remove os dados irrelevantes de cada objeto, mantendo apenas aqueles relevantes para
a análise, neste caso, o texto "Sobre Nós".
*/

// A lista de Regex abaixo é responsável por fazer o matching de padrões que não são relevantes
// Como padrões de código, comentários, etc. Eles geralmente vem presentes no dado mais cru
// extraído pelo crawler. Vários desses padrões foram gerados usando o ChatGPT.
const FILTER_TEXT_REGEX_PATTENRS = [
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

// As vezes o dado extraído tem cópias, queremos manter apenas uma
function removeDuplicatedItems(texts) {
    return texts.filter((text, index) => texts.indexOf(text) === index)
}

// Remove os padrões de texto que não são relevantes
function removeInvalidTexts(text) {
    let cleanedText = text

    for (const pattern of FILTER_TEXT_REGEX_PATTENRS) {
        cleanedText = cleanedText.replace(pattern, '')
    }

    return cleanedText
}

// Essa função faz uma primeira limpeza nos dados extraídos pelo crawler
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