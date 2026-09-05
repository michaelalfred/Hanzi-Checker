import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  if (!supabase)
    return NextResponse.json(
      { error: "Demo data is stored in the browser" },
      { status: 404 },
    );
  const { data, error } = await supabase
    .from("submissions")
    .select("*, character_results(*)")
    .eq("id", params.id)
    .single();
  return error
    ? NextResponse.json({ error: error.message }, { status: 404 })
    : NextResponse.json(data);
}
