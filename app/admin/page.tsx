import { getLessons } from "@/lib/actions/lessons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Edit, BookOpen } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import DeleteLessonButton from "@/components/admin/delete-lesson-button";

export const revalidate = 0;

export default async function AdminDashboard() {
  const lessons = await getLessons();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-600 mt-1">Manage your course lessons</p>
        </div>
        <Link href="/admin/lessons/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Lesson
          </Button>
        </Link>
      </div>

      {lessons.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No lessons yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first lesson
            </p>
            <Link href="/admin/lessons/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Lesson
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="overflow-hidden">
              {lesson.image_url && (
                <div className="relative h-48 w-full">
                  <Image
                    src={lesson.image_url}
                    alt={lesson.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-1">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {lesson.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-4">
                  Created {formatDate(lesson.created_at)}
                </div>
                <div className="flex space-x-2">
                  <Link href={`/admin/lessons/${lesson.id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteLessonButton lessonId={lesson.id} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
