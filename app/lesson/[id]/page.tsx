import { getLesson } from "@/lib/actions/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getYouTubeEmbedUrl, convertYouTubeLinksToEmbeds } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import QuizComponent from "@/components/quiz/quiz-component";

export const revalidate = 3600;

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [lesson] = await Promise.all([getLesson(id)]);

  if (!lesson) {
    notFound();
  }

  const videoEmbedUrl = lesson.video_url
    ? getYouTubeEmbedUrl(lesson.video_url)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Video */}
            {videoEmbedUrl && (
              <Card>
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <iframe
                      src={videoEmbedUrl}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lesson Header */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {lesson.title}
              </h1>
              {lesson.description && (
                <p className="text-lg text-gray-600">{lesson.description}</p>
              )}
            </div>

            {/* Lesson Content */}
            {lesson.content && (
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Lesson Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose max-w-none [&_iframe]:max-w-full [&_iframe]:relative [&_.ck-media__wrapper]:clear-both [&_figure]:my-4"
                    dangerouslySetInnerHTML={{
                      __html: convertYouTubeLinksToEmbeds(lesson.content),
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Quiz Section */}
            <QuizComponent lessonId={lesson.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
