import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  // ── Demo fallback (no Supabase credentials) ──────────────────────────────
  if (!supabase) {
    return NextResponse.json({
      demo: true,
      dates: ["8 Oct", "10 Oct", "12 Oct", "14 Oct"],
      rows: [
        { character: "校园", values: [true, true, false, false] },
        { character: "操场", values: [true, true, true, true] },
        { character: "老师", values: [false, true, true, true] },
        { character: "礼堂", values: [true, false, true, false] },
      ],
    });
  }

  // ── Real Supabase query ───────────────────────────────────────────────────
  const studentId =
    new URL(request.url).searchParams.get("studentId") || "lucas-p2";

  // Fetch up to the last 6 graded submissions, newest first so we can slice
  const { data, error } = await supabase
    .from("submissions")
    .select("id, created_at, character_results(character, is_correct)")
    .eq("student_id", studentId)
    .eq("status", "graded")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    // No submissions yet – return empty structure
    return NextResponse.json({ demo: false, dates: [], rows: [] });
  }

  // Reverse so that columns are in chronological order (oldest → newest)
  const submissions = [...data].reverse();

  // Build date header labels  e.g. "7 Sep"
  const dates = submissions.map((s) => {
    const d = new Date(s.created_at as string);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  });

  // Collect every distinct character that appears across all submissions
  const allChars = Array.from(
    new Set(
      submissions.flatMap((s) =>
        (
          s.character_results as { character: string; is_correct: boolean }[]
        ).map((r) => r.character)
      )
    )
  );

  // Build one row per character
  const rows = allChars.map((char) => {
    const values = submissions.map((s) => {
      const results = s.character_results as {
        character: string;
        is_correct: boolean;
      }[];
      const hit = results.find((r) => r.character === char);
      // If the character was not tested in this submission, treat as null
      return hit ? hit.is_correct : null;
    });
    return { character: char, values };
  });

  return NextResponse.json({ demo: false, dates, rows });
}
