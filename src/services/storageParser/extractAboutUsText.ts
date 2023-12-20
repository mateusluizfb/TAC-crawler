
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

/* 
    This function uses the OpenAI API to summarize a text. It takes the input,
    splits it in smaller chunks, and iteratively summarizes each chunk. At the end,
    combines it all in a single summarized text.
*/
async function summarize(text){
    const chunkSize = 2500;
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.slice(i, i + chunkSize));
    }

    const summaries = [];
    let previousSummary = '';
    for (const chunk of chunks) {
        const prompt = `${previousSummary}\n\nResuma o texto seguinte:\n\n${chunk}`;
        // wait 22s to avoid OpenAI API rate limit
        await new Promise(resolve => setTimeout(resolve, 22000));
        previousSummary = await openAi.createCompletion(prompt);
        summaries.push(previousSummary);
    }

    return summaries.join(' ');
}

async function validate(textString, url) {
    const reduceTextString = textString.slice(0, 3000)

    const askAboutUsInfoPrompt = `` +
    `${reduceTextString}` +
    `\n\n` +
    `O texto acima possui informação sobre o site ${url}? Utilize apenas o texto acima como informação. Responda "SIM" ou "NAO".`

    // wait 22s to avoid OpenAI API rate limit
    await new Promise(resolve => setTimeout(resolve, 22000));

    const result = await openAi.createCompletion(askAboutUsInfoPrompt);
    return result
}

async function extractAboutUsText(cleanedStorage) {
    const extractedAboutUsText = []
    for (const siteText of cleanedStorage) {
        const url = siteText.url
        const text = siteText.text
        
        console.log(`Verificando a url: ${url}`)
    
        const hasAboutUsInfo = await validate(text, url)

        if (isYesAnswer(hasAboutUsInfo)) {
            console.log(`A url ${url} possui informação sobre o site.`)
            const summarizedInfo = await summarize(text)
            extractedAboutUsText.push({ url, text: summarizedInfo })
        } else {
            console.log(`A url ${url} não possui informação sobre o site.`)
            extractedAboutUsText.push({ url, text: '' })
        }
    }

    return extractedAboutUsText
}

export default extractAboutUsText;