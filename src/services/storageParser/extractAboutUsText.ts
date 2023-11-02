
import openAi from '../../lib/openai.ts';

async function validate() {
    // const askAboutUsInfoPrompt = `` +
    // `${textString}` +
    // `\n\n` +
    // `O texto acima possui informação sobre o site ${url}? Utilize apenas o texto acima como informação. Responda "SIM" ou "NAO".`

    // const result = await openAi.createCompletion(askAboutUsInfoPrompt);
    // console.log(result);
}

async function extract () {
    // const extractAboutUsInfoPrompt = `` +
    // `${textString}` +
    // `\n\n` +
    // `Apenas usando o texto acima, extraia a informação sobre o site ${url}.`

    // const result = await openAi.createCompletion(extractAboutUsInfoPrompt);
}


async function extractAboutUsText(cleanedStorage) {
    const firstItem = cleanedStorage[0]

    const hasAboutUsInfo = await validate(firstItem.text)
    // - Se sim, perguntar para extrair a informação sobre o site
    // - Se não, retorna uma string vazia
    const aboutUsInfo = await extract(firstItem.text)

    console.log('rodando extractAboutUsText')

    // return cleanedStorage.map((siteText) => {
    //     const url = siteText.url
    //     const text = siteText.text
    
    //     // TODO
    
    //     return {
    //         url,
    //         text,
    //     }
    // })
}

export default extractAboutUsText;