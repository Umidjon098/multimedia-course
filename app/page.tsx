import { getLessons } from "@/lib/actions/lessons";
import { getUser } from "@/lib/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { BookOpen, GraduationCap } from "lucide-react";

export const revalidate = 3600;

export default async function Home() {
  const [lessons, user] = await Promise.all([getLessons(), getUser()]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600 shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  Learning Platform
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Expand your knowledge
                </p>
              </div>
            </div>
            <Link
              href={user ? "/admin" : "/login"}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base whitespace-nowrap shrink-0"
            >
              {user ? "Admin" : "Login"}
            </Link>
          </div>
        </div>
      </header>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Our Learning Platform
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover courses, watch videos, and test your knowledge
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {lessons.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No lessons available yet
              </h3>
              <p className="text-gray-600 text-center">
                Check back soon for new content!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <Link key={lesson.id} href={`/lesson/${lesson.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
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
                    <CardTitle className="line-clamp-2">
                      {lesson.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {lesson.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500">
                      {formatDate(lesson.created_at)}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
