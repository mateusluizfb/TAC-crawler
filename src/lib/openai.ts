// https://platform.openai.com/docs/libraries/node-js-library
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const createCompletion = async (prompt) => {
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
