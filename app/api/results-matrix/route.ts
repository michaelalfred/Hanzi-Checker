import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
export async function GET(request: Request) {
  if (!supabase) return NextResponse.json({ demo: true, dates: ['8 Oct', '10 Oct', '12 Oct', '14 Oct'], rows: [{ character: '校园', values: [true, true, false, false] }, { character: '操场', values: [true, true, true, true] }, { character: '老师', values: [false, true, true, true] }, { character: '礼堂', values: [true, false, true, false] }] });
  const studentId = new URL(request.url).searchParams.get('studentId') || 'lucas-p2';
  const { data, error } = await supabase.from('submissions').select('created_at, character_results(character,is_correct)').eq('student_id', studentId).eq('status', 'graded').order('created_at');
  return error ? NextResponse.json({ error: error.message }, { status: 500 }) : NextResponse.json(data);
}
