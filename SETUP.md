# Getting Started with Your Educational Platform

## Quick Start Guide

### 1. **Set up Supabase**

- Go to https://supabase.com and create a free account
- Create a new project
- Note down your project URL and anon key

### 2. **Configure Database**

- In Supabase dashboard, go to SQL Editor
- Copy the entire content from `supabase/schema.sql`
- Paste and run it in the SQL Editor
- This will create all necessary tables and policies

### 3. **Set Environment Variables**

- Copy `.env.example` to `.env.local`
- Replace the placeholder values with your actual Supabase credentials

### 4. **Install and Run**

```bash
npm install
npm run dev
```

### 5. **Create Your Admin Account**

- Open http://localhost:3000/login
- Click "Sign up"
- Enter your email and password
- Check your email for verification (if enabled)

### 6. **Start Creating Content**

- After logging in, you'll be redirected to `/admin`
- Click "Create Lesson" to add your first lesson
- Add title, description, video URL (YouTube), and upload an image
- Use the rich text editor to add detailed content
- Save the lesson

### 7. **Add Quizzes**

- Edit any lesson
- Click on "Quiz Questions" tab
- Add questions with multiple choice options
- Mark the correct answer
- Students can take quizzes on the public lesson pages

## Common Issues & Solutions

### Issue: "Cannot connect to Supabase"

**Solution**: Double-check your `.env.local` file has the correct values

### Issue: "Permission denied" when creating lessons

**Solution**: Make sure you're logged in and the SQL schema was run correctly

### Issue: CKEditor not loading

**Solution**:

```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Issue: Images not uploading

**Solution**: Verify the `lesson-media` storage bucket exists in Supabase

## Features Overview

### Admin Panel Features:

- ✅ CRUD operations for lessons
- ✅ Rich text editing with media embedding
- ✅ Quiz management with multiple choice questions
- ✅ Image and video upload support
- ✅ Protected routes with authentication

### Public Website Features:

- ✅ Browse all lessons with beautiful cards
- ✅ Watch videos and read rich content
- ✅ Take interactive quizzes with instant results
- ✅ View related lessons
- ✅ Fully responsive design

## Next Steps

1. **Customize Design**: Edit TailwindCSS classes in components
2. **Add More Features**: Extend the schema for categories, tags, etc.
3. **Deploy**: Follow the Netlify deployment guide in README.md
4. **Analytics**: Add tracking with Vercel Analytics or Google Analytics

## Need Help?

- Check the README.md for detailed documentation
- Review the Supabase documentation: https://supabase.com/docs
- Check Next.js documentation: https://nextjs.org/docs

Happy teaching! 🎓
