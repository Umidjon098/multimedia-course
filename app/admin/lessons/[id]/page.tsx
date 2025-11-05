import { getLesson } from "@/lib/actions/lessons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import LessonForm from "@/components/admin/lesson-form";
import QuizManager from "@/components/admin/quiz-manager";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = await getLesson(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="lesson" className="space-y-6">
        <TabsList>
          <TabsTrigger value="lesson">Lesson Details</TabsTrigger>
          <TabsTrigger value="quiz">Quiz Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="lesson">
          <Card>
            <CardHeader>
              <CardTitle>Edit Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <LessonForm lesson={lesson} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Manage Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <QuizManager lessonId={lesson.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
