export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          video_url: string | null;
          image_url: string | null;
          content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          video_url?: string | null;
          image_url?: string | null;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          video_url?: string | null;
          image_url?: string | null;
          content?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      quizzes: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      quiz_questions: {
        Row: {
          id: string;
          quiz_id: string;
          question: string;
          options: QuizOption[];
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question: string;
          options: QuizOption[];
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question?: string;
          options?: QuizOption[];
          order_index?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type LessonInsert = Database["public"]["Tables"]["lessons"]["Insert"];
export type LessonUpdate = Database["public"]["Tables"]["lessons"]["Update"];

export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];
export type QuizInsert = Database["public"]["Tables"]["quizzes"]["Insert"];
export type QuizUpdate = Database["public"]["Tables"]["quizzes"]["Update"];

export type QuizQuestion =
  Database["public"]["Tables"]["quiz_questions"]["Row"];
export type QuizQuestionInsert =
  Database["public"]["Tables"]["quiz_questions"]["Insert"];
export type QuizQuestionUpdate =
  Database["public"]["Tables"]["quiz_questions"]["Update"];

export interface QuizOption {
  text: string;
  is_correct: boolean;
}

export interface LessonWithQuiz extends Lesson {
  quiz?: Quiz & {
    questions: QuizQuestion[];
  };
}
