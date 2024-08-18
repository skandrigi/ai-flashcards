import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are an AI flashcard generator. Your task is to create educational flashcards from the provided text or topic. Each flashcard should have a clear and concise question on one side, with a corresponding answer on the other. Focus on highlighting key concepts, definitions, and important details that will help users retain information. Generate a set of flashcards based on the following topic or text'
You are an AI flashcard generator.
Create educational flashcards from the provided text or topic.
Each flashcard should have a clear question on one side.
Each flashcard should have a corresponding answer on the other side.
Highlight key concepts.
Include definitions.
Emphasize important details.
Generate flashcards based on the following topic or text.

Return in thee following JSON format:
{
  "flashcards": [
    {
    "front":str,
    "back":str
    },
    ]
}
`

export async function POST(req) {
    const openai = OpenAI()
    const data  = await req.text()
    const completion = await openai.completion.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: data,
            },
        ],
        model: "gpt-4o",
        response_format: "json_object",
    })

    const flashcards = JSON.parse(completion.data.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}