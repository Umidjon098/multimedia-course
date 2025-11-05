import LessonForm from "@/components/admin/lesson-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewLessonPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Lesson</CardTitle>
        </CardHeader>
        <CardContent>
          <LessonForm />
        </CardContent>
      </Card>
    </div>
  );
}
