# Educational Web Platform

A fullstack educational web platform built with **Next.js 14**, **TypeScript**, **Supabase**, and deployable on **Netlify**.

## 🚀 Features

### Admin Panel (`/admin`)
- ✅ Create, edit, and delete lessons
- ✅ Rich text editor (CKEditor 5) for lesson content
- ✅ Upload images and videos
- ✅ Create and manage quizzes for each lesson
- ✅ Multiple-choice questions with instant feedback
- ✅ Protected routes with Supabase authentication

### Public Website
- ✅ Browse all available lessons
- ✅ Lesson detail pages with video and rich content
- ✅ Interactive quizzes with scoring
- ✅ Related lessons recommendations
- ✅ Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (Database, Auth, Storage)
- **Editor**: CKEditor 5
- **Forms**: React Hook Form + Zod
- **Data Fetching**: React Query
- **Deployment**: Netlify

## 📦 Installation

### Prerequisites
- Node.js 20+ installed
- A Supabase account
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd multimedia-course
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project on [Supabase](https://supabase.com)
2. Go to **Project Settings** → **API** and copy:
   - Project URL
   - Anon/Public Key
3. Run the SQL schema from `supabase/schema.sql` in the Supabase SQL editor

### 4. Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔐 Authentication

1. Go to `/login`
2. Click "Sign up" to create admin account
3. Enter email and password

## 🚢 Deployment on Netlify

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Connect your repository
4. Add environment variables
5. Deploy

## 📝 Usage

### Creating a Lesson
1. Log in to admin panel
2. Click "Create Lesson"
3. Fill in title, description, video URL, upload image
4. Add content using rich text editor
5. Save

### Adding a Quiz
1. Edit a lesson
2. Go to "Quiz Questions" tab
3. Add questions with multiple choices
4. Mark correct answers
5. Save

## 📄 License

MIT License

Built with ❤️ using Next.js and Supabase
# multimedia-course
