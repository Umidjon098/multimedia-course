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
        "Are you sure you want to delete this lesson? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteLesson(lessonId);
      if (result.error) {
        alert("Error deleting lesson: " + result.error);
      }
    } catch {
      alert("Error deleting lesson");
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
