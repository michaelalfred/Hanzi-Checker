import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/worksheet/[file]
//
// Returns a short-lived (60 s) Supabase signed URL for a PDF that lives in the
// "syllabus" storage bucket.  The client then opens it directly so the browser
// handles the download / print dialog.
//
// The [file] segment must match the exact filename you uploaded to the bucket,
// e.g. "week-4-worksheet.pdf".
// ─────────────────────────────────────────────────────────────────────────────

const BUCKET = "syllabus";
// Signed URL stays valid for 60 seconds — enough to open it but short enough
// to limit accidental sharing.
const EXPIRES_IN = 60;

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

  // ── Generate signed URL ─────────────────────────────────────────────────
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filename, EXPIRES_IN);

  if (error || !data?.signedUrl) {
    console.error("[worksheet] Supabase error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ??
          `File "${filename}" not found in the "${BUCKET}" bucket.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ url: data.signedUrl });
}
