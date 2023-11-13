
import { url } from 'inspector';
import openAi from '../../lib/openai.ts';

function isYesAnswer(text) {
    const YES_ALTERNATIVES = [
        'SIM',
        'SIM.',
        'SIM!',
        'Sim',
        'Sim.',
    ]

    return YES_ALTERNATIVES.some(alternative => text.includes(alternative))
}

async function validate(textString, url) {
    const reduceTextString = textString.slice(0, 3000)
    const askAboutUsInfoPrompt = `` +
    `${reduceTextString}` +
    `\n\n` +
    `O texto acima possui informação sobre o site ${url}? Utilize apenas o texto acima como informação. Responda "SIM" ou "NAO".`

    const result = await openAi.createCompletion(askAboutUsInfoPrompt);
    return result
}

async function extract (textString, url) {
    const reduceTextString = textString.slice(0, 3000)
    const extractAboutUsInfoPrompt = `` +
    `${reduceTextString}` +
    `\n\n` +
    `Apenas usando o texto acima, extraia a informação sobre o site ${url}.`

    const result = await openAi.createCompletion(extractAboutUsInfoPrompt);
    return result
}


async function extractAboutUsText(cleanedStorage) {
    console.log('rodando extractAboutUsText')

    const extractedAboutUsText = []
    for (const siteText of cleanedStorage) {
        const url = siteText.url
        const text = siteText.text
        console.log('Verificando a url: ', url)
    
        const hasAboutUsInfo = await validate(text, url)

        if (isYesAnswer(hasAboutUsInfo)) {
            const aboutUsInfo = await extract(text, url)
        
            extractedAboutUsText.push({
                url,
                text: aboutUsInfo,
            })
        } else {
            extractedAboutUsText.push({
                url,
                text: ''})
        }
    }
    return extractedAboutUsText
}

export default extractAboutUsText;