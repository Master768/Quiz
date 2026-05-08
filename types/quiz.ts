export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, string>;
  score: number;
  isCompleted: boolean;
}

export interface ExcelRow {
  Question: string;
  "Option A": string;
  "Option B": string;
  "Option C": string;
  "Option D": string;
  Answer: string;
  POINT: number;
}
