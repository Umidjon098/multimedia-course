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
          <TabsTrigger value="lesson">Dars tafsilotlari</TabsTrigger>
          <TabsTrigger value="quiz">Test savollari</TabsTrigger>
        </TabsList>

        <TabsContent value="lesson">
          <Card>
            <CardHeader>
              <CardTitle>Darsni tahrirlash</CardTitle>
            </CardHeader>
            <CardContent>
              <LessonForm lesson={lesson} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Testni boshqarish</CardTitle>
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
