// https://platform.openai.com/docs/libraries/node-js-library
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/*
    Função responsável por chamar a API do OpenAI e retornar o texto resumido.
*/
export const createCompletion = async (prompt) => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not found');
    }

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: prompt,
            }
        ],
        model: 'gpt-3.5-turbo',
    });

    return chatCompletion.choices[0].message.content;
}

export default {
    createCompletion,
};
