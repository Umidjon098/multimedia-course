"use client";

import { deleteLesson } from "@/lib/actions/lessons";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteLessonButton({ lessonId }: { lessonId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        "Haqiqatan ham bu darsni o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteLesson(lessonId);
      if (result.error) {
        alert("Darsni o'chirishda xatolik: " + result.error);
      }
    } catch {
      alert("Darsni o'chirishda xatolik yuz berdi");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="danger"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
