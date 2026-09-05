import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const image = form.get("image") as File | null;
    if (!image)
      return NextResponse.json(
        { error: "An image is required" },
        { status: 400 },
      );
    let lessonId = String(form.get("lessonId") || "");
    const studentId = String(form.get("studentId") || "lucas-p2");
    if (!supabase)
      return NextResponse.json({
        submissionId: crypto.randomUUID(),
        imageUrl: "",
        demo: true,
      });
    // The demo UI has a human-friendly lesson label; resolve it to the seeded
    // Week 4 UUID before creating the foreign-keyed submission.
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        lessonId,
      )
    ) {
      const { data: lesson, error: lessonError } = await supabase
        .from("lessons")
        .select("id")
        .eq("moe_level", "P2")
        .eq("week_number", 4)
        .limit(1)
        .single();
      if (lessonError || !lesson)
        throw new Error(
          "Week 4 lesson is missing. Run supabase/schema.sql first.",
        );
      lessonId = lesson.id;
    }
    const path = `${studentId}/${Date.now()}-${image.name || "worksheet.jpg"}`;
    const { error: storageError } = await supabase.storage
      .from("worksheets")
      .upload(path, image, {
        contentType: image.type || "image/jpeg",
        upsert: false,
      });
    if (storageError) throw storageError;
    const { data: publicUrl } = supabase.storage
      .from("worksheets")
      .getPublicUrl(path);
    const { data, error } = await supabase
      .from("submissions")
      .insert({
        student_id: studentId,
        lesson_id: lessonId,
        image_url: publicUrl.publicUrl,
        status: "pending",
      })
      .select("id")
      .single();
    if (error) throw error;
    return NextResponse.json({
      submissionId: data.id,
      imageUrl: publicUrl.publicUrl,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    );
  }
}
