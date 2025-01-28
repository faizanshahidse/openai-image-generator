import express from "express";
import OpenAI from "openai";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const OPENAI_KEY = process.env["OPENAI_API_KEY"];

const openai = new OpenAI({
  apiKey: OPENAI_KEY,
});

async function checkUsage() {
  try {
    const response = await openai.moderations.create({ input: "test" });
    console.log("API is working, your account has credits.");
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
}

checkUsage();

app.get("/image/:statement", async (req, res) => {
  const { statement } = req.params;
  const response = await openai.images.generate({
    prompt: statement,
    model: "dall-e-2",
    n: 1,
  });

  const image_url = response.data.data[0].url;
  res.send(image_url);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const completion = openai.chat.completions.create({
//   model: "gpt-4o-mini",
//   store: true,
//   messages: [{ role: "user", content: "write a short story" }],
// });

// completion.then((result) => console.log(result.choices[0].message));
