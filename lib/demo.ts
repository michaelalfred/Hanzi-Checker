export type CharacterResult = { character: string; correct: boolean; expected_text: string };
export type Grade = { submissionId: string; imageUrl: string; totalScore: number; totalPossible: number; results: CharacterResult[]; createdAt: string; gradingSource?: 'gemini' | 'fallback'; fallbackReason?: string };
export const words = ['校园', '操场', '老师', '礼堂'];
export const demoResults = (list: string[] = words): CharacterResult[] => list.map((character, i) => ({ character, correct: i !== 0 && i !== 3, expected_text: character }));
