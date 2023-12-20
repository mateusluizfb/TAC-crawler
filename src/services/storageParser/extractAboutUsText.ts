
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
    Essa função utiliza a API do OpenAI para resumir um texto. Ela pega a entrada,
    divide em pedaços menores, e itera sobre cada pedaço para resumir. No final,
    combina tudo em um único texto resumido.

    Note que para evitar o limite de requisições da API do OpenAI no free tier,
    a função espera 22s entre cada requisição. Isso porque as vezes o texto de entrada
    é muito grande e precisamos fazer multiplas requisições para resumir tudo.
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

        // Espera 22s para evitar o limite de requisições da API do OpenAI no free tier
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

    // Espera 22s para evitar o limite de requisições da API do OpenAI no free tier
    await new Promise(resolve => setTimeout(resolve, 22000));

    const result = await openAi.createCompletion(askAboutUsInfoPrompt);
    return result
}


/*

    Dado um array de objetos com a seguinte estrutura:
    {
        "url": "1",
        "text": "Um texto bem logo que pode conter a seção Sobre Nós, ou não."
    }

    Esta função extrai apenas o texto "Sobre Nós" de cada site e retorna um array de objetos com a seguinte estrutura:
    
    {
        "url": "1",
        "text": "Resumo do texto Sobre Nós"
    }
*/
async function extractAboutUsText(cleanedStorage) {
    const extractedAboutUsText = []
    for (const siteText of cleanedStorage) {
        const url = siteText.url
        const text = siteText.text
        
        console.log(`Verificando a url: ${url}`)
    
        // Verificamos se o texto possui a seção "Sobre Nós"
        const hasAboutUsInfo = await validate(text, url)
        
        if (isYesAnswer(hasAboutUsInfo)) {
            console.log(`A url ${url} possui informação sobre o site.`)

            // Se tiver, resumimos o texto
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