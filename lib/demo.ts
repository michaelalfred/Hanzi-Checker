export type CharacterResult = { character: string; correct: boolean; expected_text: string };
export type Grade = { submissionId: string; imageUrl: string; totalScore: number; totalPossible: number; results: CharacterResult[]; createdAt: string; gradingSource?: 'gemini' | 'fallback'; fallbackReason?: string };
