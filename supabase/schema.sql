-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url VARCHAR(500),
  image_url VARCHAR(500),
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of options [{text: string, is_correct: boolean}]
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_lessons_created_at ON lessons(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson_id ON quizzes(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_order ON quiz_questions(quiz_id, order_index);

-- Enable Row Level Security (RLS)
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lessons (anyone can read, authenticated users can write)
CREATE POLICY "Public lessons are viewable by everyone" ON lessons
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert lessons" ON lessons
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update lessons" ON lessons
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete lessons" ON lessons
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for quizzes (anyone can read, authenticated users can write)
CREATE POLICY "Public quizzes are viewable by everyone" ON quizzes
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert quizzes" ON quizzes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quizzes" ON quizzes
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete quizzes" ON quizzes
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for quiz_questions (anyone can read, authenticated users can write)
CREATE POLICY "Public quiz questions are viewable by everyone" ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert quiz questions" ON quiz_questions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update quiz questions" ON quiz_questions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete quiz questions" ON quiz_questions
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage bucket for lesson images and videos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lesson-media', 'lesson-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'lesson-media');

CREATE POLICY "Authenticated users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'lesson-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'lesson-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete files" ON storage.objects
  FOR DELETE USING (bucket_id = 'lesson-media' AND auth.role() = 'authenticated');
