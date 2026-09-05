import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { supabase } from "@/lib/supabase";

const cleanJson = (text: string) => text.replace(/```json|```/g, "").trim();
export async function POST(request: Request) {
  try {
    const { submissionId, imageUrl, wordList = [] } = await request.json();
    const words: string[] = wordList.length
      ? wordList
      : ["校园", "操场", "老师", "礼堂"];
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini is not configured." }, { status: 503 });
    }
    if (!imageUrl?.startsWith("data:")) {
      return NextResponse.json({ error: "A captured worksheet image is required for grading." }, { status: 400 });
    }
    const [meta, data] = imageUrl.split(",");
    const mimeType = meta.match(/data:(.*?);/)?.[1] || "image/jpeg";
    const model = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY,
    ).getGenerativeModel({ model: "gemini-3.6-flash" });
    const answer = await model.generateContent([
      { inlineData: { data, mimeType } },
      `Compare handwriting against: ${words.join(", ")}. Return only JSON: [{"character":"校园","correct":true}]`,
    ]);
    const parsed = JSON.parse(cleanJson(answer.response.text()));
    if (!Array.isArray(parsed)) {
      throw new Error("Gemini did not return an array of results.");
    }
    const results = parsed.map((r: { character: string; correct: boolean }) => ({
      character: r.character,
      correct: Boolean(r.correct),
      expected_text: r.character,
    }));
    const totalScore = results.filter((r) => r.correct).length;
    if (supabase && submissionId && !String(submissionId).startsWith("demo-")) {
      await supabase
        .from("character_results")
        .insert(
          results.map((r) => ({
            submission_id: submissionId,
            character: r.character,
            is_correct: r.correct,
            expected_text: r.expected_text,
          })),
        );
      await supabase
        .from("submissions")
        .update({
          status: "graded",
          total_score: totalScore,
          total_possible: results.length,
        })
        .eq("id", submissionId);
    }
    return NextResponse.json({
      submissionId,
      imageUrl,
      totalScore,
      totalPossible: results.length,
      results,
      createdAt: new Date().toISOString(),
      gradingSource: "gemini",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Grading failed" },
      { status: 500 },
    );
  }
}
