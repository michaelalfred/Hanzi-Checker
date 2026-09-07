import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/worksheet/[file]
//
// Returns a stable public URL for a PDF in the public "syllabus" bucket.
// This avoids stale/expired signed URL JWTs being retained by a browser cache.
//
// The [file] segment must match the exact filename you uploaded to the bucket,
// e.g. "week-4-worksheet.pdf".
// ─────────────────────────────────────────────────────────────────────────────

const BUCKET = "syllabus";

export async function GET(
  _: Request,
  { params }: { params: { file: string } },
) {
  const filename = decodeURIComponent(params.file);

  // ── Demo / no-Supabase fallback ─────────────────────────────────────────
  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY to your .env.local.",
      },
      { status: 503 },
    );
  }

  // ── Validation ─────────────────────────────────────────────────────────
  if (!filename || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Invalid filename." }, { status: 400 });
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  if (!data.publicUrl) {
    return NextResponse.json(
      { error: `Could not create a public URL for "${filename}".` },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: data.publicUrl });
}
