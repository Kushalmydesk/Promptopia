import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt.model";

export const POST = async (req, res) => {
  const { userID, prompt, tag } = await req.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userID,
      prompt: prompt,
      tag: tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    console.log(err.message);
    return new Response("Failed to save the prompt",{
        status: 500
    })
  }
};
