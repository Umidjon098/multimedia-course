"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type {
  QuizInsert,
  QuizQuestionInsert,
  QuizQuestionUpdate,
} from "@/lib/types/database";

export async function getQuizByLessonId(lessonId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quizzes")
    .select(
      `
      *,
      quiz_questions (*)
    `
    )
    .eq("lesson_id", lessonId)
    .single();

  if (error) {
    console.error("Error fetching quiz:", error);
    return null;
  }

  return data;
}

export async function createQuiz(quiz: QuizInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      ...quiz,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating quiz:", error);
    return { error: error.message };
  }

  revalidatePath(`/lesson/${quiz.lesson_id}`);
  return { data };
}

export async function deleteQuiz(id: string, lessonId: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("quizzes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting quiz:", error);
    return { error: error.message };
  }

  revalidatePath(`/lesson/${lessonId}`);
  return { success: true };
}

export async function createQuizQuestion(question: QuizQuestionInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quiz_questions")
    .insert({
      ...question,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating quiz question:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { data };
}

export async function updateQuizQuestion(
  id: string,
  question: QuizQuestionUpdate
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quiz_questions")
    .update({
      ...question,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating quiz question:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { data };
}

export async function deleteQuizQuestion(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("quiz_questions").delete().eq("id", id);

  if (error) {
    console.error("Error deleting quiz question:", error);
    return { error: error.message };
  }

  revalidatePath("/admin");
  return { success: true };
}
