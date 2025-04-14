// import { chatSession } from "@/configs/AiModel";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { prompt } = await req.json();

//   try {
//     const result = await chatSession.sendMessage(prompt);
//     const AIresp = result.response.text();

//     return NextResponse.json({ result: AIResp });
//   } catch (e) {
//     return NextResponse.json({ error: e });
//   }
// }
import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received prompt:", prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log("AI Model Response:", result);

    if (!result || !result.response) {
      throw new Error("No valid response from AI model.");
    }

    const resp = await result.response.text();
    console.log("Processed AI Response:", resp);

    return NextResponse.json({ result: resp });
  } catch (e) {
    console.error("API Error:", e);
    return NextResponse.json({ error: e.message || "Unknown error" });
  }
}
