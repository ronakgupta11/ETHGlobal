import React from 'react'
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);

export default function AImodel(){

async function generate(){
if (!configuration.apiKey) {
   console.log("error in open api config , follow readme md")
    return;
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "waht can you do",
      temperature: 0.6,
      max_tokens:3500
    });

    const imageGen = await openai.createImage({
      prompt: "generate a random image",
      n: 1,
      size: "1024x1024",
    });

    
    console.log(completion,imageGen)
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      
    }
  }}
  return (
    <div>AImodel
        <button onClick={generate}>gen</button>
    </div>
  )
}
