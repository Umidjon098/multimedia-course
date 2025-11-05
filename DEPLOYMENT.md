# 🚀 Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Checklist

### 1. Supabase Configuration

- [ ] Supabase project created
- [ ] Database schema executed (`supabase/schema.sql`)
- [ ] Storage bucket `lesson-media` created
- [ ] RLS policies enabled and working
- [ ] Email authentication configured (optional)
- [ ] Auth redirect URLs set to production domain

### 2. Environment Variables

- [ ] `.env.local` configured for local development
- [ ] Netlify environment variables set:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL` (production URL)

### 3. Code Quality

- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint errors: `npm run lint`
- [ ] All components working in development
- [ ] Test lesson creation and editing
- [ ] Test quiz functionality
- [ ] Test authentication flow

### 4. Security Review

- [ ] `.env.local` is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] Supabase RLS policies tested
- [ ] Admin routes protected by middleware
- [ ] File upload restrictions in place

### 5. Content Preparation

- [ ] At least one test lesson created
- [ ] Sample quiz questions added
- [ ] Test images uploaded successfully
- [ ] Video embeds working correctly

### 6. Git Repository

- [ ] Code committed to Git
- [ ] Pushed to GitHub/GitLab/Bitbucket
- [ ] `.gitignore` properly configured
- [ ] README.md updated with your project info

---

## 🌐 Netlify Deployment Steps

### Option A: Deploy via Netlify Dashboard

1. **Connect Repository**

   - Log in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose your Git provider and repository

2. **Configure Build Settings**

   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: (leave empty)

3. **Set Environment Variables**
   Go to Site settings → Environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
   NEXT_PUBLIC_SITE_URL = https://your-site.netlify.app
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Visit your live site!

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your_url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_key"
netlify env:set NEXT_PUBLIC_SITE_URL "your_netlify_url"

# Deploy
netlify deploy --prod
```

---

## 🔧 Post-Deployment Checklist

### 1. Test Production Site

- [ ] Homepage loads correctly
- [ ] Lessons display properly
- [ ] Lesson detail pages work
- [ ] Videos play correctly
- [ ] Quiz functionality works
- [ ] Images load from Supabase storage

### 2. Test Admin Panel

- [ ] Can access `/login`
- [ ] Can sign up/sign in
- [ ] Redirect to admin panel works
- [ ] Can create new lessons
- [ ] Can edit existing lessons
- [ ] Can upload images
- [ ] Can add quiz questions
- [ ] Can delete lessons
- [ ] Logout works correctly

### 3. Configure Supabase for Production

- [ ] Update Auth redirect URLs:

  - Go to Supabase → Authentication → URL Configuration
  - Add your Netlify URL to "Site URL"
  - Add `https://your-site.netlify.app/**` to "Redirect URLs"

- [ ] Test authentication on production

### 4. Performance Check

- [ ] Page load times acceptable
- [ ] Images optimized and loading fast
- [ ] No console errors
- [ ] Mobile responsiveness verified
- [ ] Test on different browsers

### 5. Security Verification

- [ ] `/admin` routes require login
- [ ] Unauthorized users can't create/edit lessons
- [ ] RLS policies working on production
- [ ] HTTPS enabled (automatic on Netlify)

---

## 🐛 Common Deployment Issues

### Issue: "Build failed"

**Solution**:

```bash
rm -rf .next node_modules
npm install
npm run build
```

Fix any TypeScript or build errors locally first.

### Issue: "Environment variables not working"

**Solution**:

- Verify they're set in Netlify dashboard
- Redeploy site after adding variables
- Check for typos in variable names

### Issue: "Cannot connect to Supabase"

**Solution**:

- Verify Supabase project is not paused
- Check environment variables are correct
- Ensure `NEXT_PUBLIC_` prefix on client-side vars

### Issue: "403 Forbidden on file upload"

**Solution**:

- Check Supabase storage policies
- Verify bucket name is correct (`lesson-media`)
- Run storage policies from `schema.sql`

### Issue: "Redirects not working"

**Solution**:

- Check `netlify.toml` is in root directory
- Verify redirect rules are correct
- Clear browser cache

---

## 📊 Monitoring & Maintenance

### After Deployment:

1. **Monitor Errors**

   - Check Netlify deploy logs
   - Monitor Supabase dashboard for errors
   - Set up error tracking (Sentry, etc.)

2. **Regular Maintenance**

   - Update dependencies monthly: `npm update`
   - Check Supabase storage usage
   - Monitor database query performance
   - Review and update content regularly

3. **Backups**
   - Regular database backups via Supabase
   - Keep copy of environment variables
   - Version control for all code changes

---

## 🎉 Launch Checklist

Final steps before announcing your site:

- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic on Netlify)
- [ ] Create initial content (5-10 lessons)
- [ ] Test all features one more time
- [ ] Share login credentials with admin team
- [ ] Prepare announcement/marketing materials
- [ ] Set up analytics (Google Analytics, Plausible, etc.)

---

## 📞 Support Resources

- **Netlify Support**: https://docs.netlify.com
- **Supabase Support**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Project Issues**: Check PROJECT_SUMMARY.md

---

**Ready to deploy? Let's go! 🚀**

Remember: Test everything locally first, then test everything again on production! 🧪
