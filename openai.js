const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization:"org-ByL6sABigDdpaEdBaalY0AYx",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
export async function sendMsgToOpenAI(message){
    try {
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: message,
            max_tokens: 256,
            temperature: 0.5,
        });
        return response.data.choices[0].text
    } catch (error) {
        console.error("Error:", error.message);
    }
};
