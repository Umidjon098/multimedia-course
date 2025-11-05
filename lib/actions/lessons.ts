"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { LessonInsert, LessonUpdate } from "@/lib/types/database";

export async function getLessons() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }

  return data;
}

export async function getLesson(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select(
      `
      *,
      quizzes (
        *,
        quiz_questions (*)
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }

  return data;
}

export async function createLesson(lesson: LessonInsert) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .insert({
      ...lesson,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating lesson:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/lessons");
  revalidatePath("/");
  return { data };
}

export async function updateLesson(id: string, lesson: LessonUpdate) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lessons")
    .update({
      ...lesson,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating lesson:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/lessons");
  revalidatePath(`/lesson/${id}`);
  revalidatePath("/");
  return { data };
}

export async function deleteLesson(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("lessons").delete().eq("id", id);

  if (error) {
    console.error("Error deleting lesson:", error);
    return { error: error.message };
  }

  revalidatePath("/admin/lessons");
  revalidatePath("/");
  return { success: true };
}

export async function uploadFile(file: File, bucket: string = "lesson-media") {
  const supabase = await createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()
    .toString(36)
    .substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file:", error);
    return { error: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path);

  return { data: { path: data.path, url: publicUrl } };
}

export async function deleteFile(
  path: string,
  bucket: string = "lesson-media"
) {
  const supabase = await createClient();

  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    console.error("Error deleting file:", error);
    return { error: error.message };
  }

  return { success: true };
}
