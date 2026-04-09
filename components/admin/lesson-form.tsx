"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/editor/rich-text-editor";
import { createLesson, updateLesson, uploadFile } from "@/lib/actions/lessons";
import type { Lesson } from "@/lib/types/database";
import { Upload } from "lucide-react";

interface LessonFormProps {
  lesson?: Lesson;
}

export default function LessonForm({ lesson }: LessonFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: lesson?.title || "",
    description: lesson?.description || "",
    video_url: lesson?.video_url || "",
    image_url: lesson?.image_url || "",
    content: lesson?.content || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(lesson?.image_url || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if a new one was selected
      if (imageFile) {
        const uploadResult = await uploadFile(imageFile);
        if (uploadResult.error) {
          alert("Rasm yuklashda xatolik: " + uploadResult.error);
          setIsSubmitting(false);
          return;
        }
        imageUrl = uploadResult.data?.url || "";
      }

      const lessonData = {
        ...formData,
        image_url: imageUrl,
      };

      let result;
      if (lesson) {
        result = await updateLesson(lesson.id, lessonData);
      } else {
        result = await createLesson(lessonData);
      }

      if (result.error) {
        alert("Darsni saqlashda xatolik: " + result.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      alert("Darsni saqlashda xatolik yuz berdi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Sarlavha"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
        placeholder="Dars sarlavhasini kiriting"
      />

      <Textarea
        label="Tavsif"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Darsning qisqacha tavsifi"
        rows={3}
      />

      <Input
        label="Video manzili (YouTube yoki to'g'ridan-to'g'ri havola)"
        value={formData.video_url}
        onChange={(e) =>
          setFormData({ ...formData, video_url: e.target.value })
        }
        placeholder="https://youtube.com/watch?v=..."
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Dars uchun rasm
        </label>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              <span className="text-sm">Rasm tanlash</span>
            </div>
          </label>
          {imagePreview && (
            <div className="relative h-20 w-20">
              <Image
                src={imagePreview}
                alt="Ko'rib chiqish"
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Dars mazmuni
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
          placeholder="Dars matnini shu yerga yozing..."
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin")}
          disabled={isSubmitting}
        >
          Bekor qilish
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saqlanmoqda..."
            : lesson
              ? "Darsni yangilash"
              : "Dars yaratish"}
        </Button>
      </div>
    </form>
  );
}
