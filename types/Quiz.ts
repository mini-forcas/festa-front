export type QuizType = {
  id: number;
  admin_id: number;
  question: string;
  correct_option_id: number;
  created_at: string;
  updated_at: string;
};

export type QuizChoiceType = {
  id: number;
  quiz_id: number;
  option_text: string;
  created_at: string;
  updated_at: string;
};
