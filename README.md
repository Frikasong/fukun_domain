# Fukun Domain - Deployment Guide

This is your personal portfolio website with sections for Legal Tech, Admin Law, Essays, Photography, Music, and more.

## 📁 Files Included

- `index.html` - Main HTML file that loads React and your app
- `App.jsx` - Your portfolio application (React component)
- `README.md` - This file

## 🚀 Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

1. Go to [netlify.com](https://www.netlify.com)
2. Sign up or log in
3. Drag and drop this entire folder onto Netlify's dashboard
4. Your site will be live at `https://your-site-name.netlify.app`
5. You can update it anytime by dragging the folder again

**Custom Domain:** You can add your own domain (like fukunyang.com) in Netlify settings.

### Option 2: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "Add New Project"
4. Upload this folder or connect a GitHub repo
5. Deploy!

### Option 3: GitHub Pages

1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository (e.g., `fukun-portfolio`)
3. Upload these files to the repository
4. Go to Settings → Pages
5. Enable GitHub Pages
6. Your site will be at `https://yourusername.github.io/fukun-portfolio`

### Option 4: Surge (Super Simple)

1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Open terminal/command prompt in this folder
3. Run: `npx surge`
4. Follow the prompts
5. Your site is live!

## ✏️ Editing After Publication

### Method 1: Edit Locally, Re-upload
1. Open `App.jsx` in any text editor (VS Code, Sublime, Notepad++)
2. Make your changes
3. Re-upload/re-deploy to your chosen platform

### Method 2: Use GitHub (Recommended for ongoing edits)
1. Put your files in a GitHub repository
2. Connect the repo to Netlify/Vercel
3. Edit files on GitHub
4. Changes auto-deploy!

### Method 3: Online Code Editor
- Use [StackBlitz](https://stackblitz.com) or [CodeSandbox](https://codesandbox.io)
- Import your project
- Edit in browser
- Export and re-deploy

## 🔄 Notion Auto-Sync (Recommended)

Your site can automatically pull posts from a Notion database and publish updates on GitHub Pages every 6 hours.

### 1) Create a Notion integration
1. Go to Notion integrations and create an internal integration
2. Copy the API token
3. Share your posts database with that integration

### 2) Add GitHub repository secrets
In GitHub repo → **Settings** → **Secrets and variables** → **Actions** add:
- `NOTION_API_KEY` = your Notion integration token
- `NOTION_DATABASE_ID` = your Notion database ID

### 3) Database field expectations
- `Title` (title)
- `Date` (date)
- `Section` (select/status): `tech`, `law`, `investment`, `essays`, `music`, `photography`
- Optional publish control:
  - checkbox property containing `publish`/`live` in the name, OR
  - select/status value `published`, `live`, `public`, or `done`

### 4) Automation files
- Workflow: `.github/workflows/notion-posts-sync.yml`
- Fetch script: `scripts/fetch-notion-posts.mjs`
- Output JSON: `notion-posts.json`

### 5) Trigger manually (optional)
GitHub repo → **Actions** → **Sync Notion Posts** → **Run workflow**.

## 💾 Data Storage

Your portfolio uses **localStorage** to save:
- Blog posts/entries
- Comments (shared across all visitors)
- Images and attachments

**Important Notes:**
- Data persists in the browser
- Comments are shared between all users
- To backup data, export from browser's localStorage
- Consider using a backend service (Firebase, Supabase) for production use

## 🔧 Troubleshooting

**Posts not saving?**
- Check browser console for errors
- Make sure localStorage is enabled
- Try a different browser

**Images not uploading?**
- Keep images under 5MB
- Use .jpg, .png, or .webp formats

**Site not loading?**
- Check that all files are in the same folder
- Verify internet connection (loads React from CDN)

## 📝 Making Content Changes

To update your About or Contact info, edit the `SECTIONS` configuration in `App.jsx` around line 20-30.

## 🎨 Customizing Colors

Search for these in `App.jsx` to change the color scheme:
- `rgba(173, 216, 230` - Baby blue
- `#6a9eb8` - Darker blue
- `#8a9aa8` - Grey tones

## 📧 Support

For questions about the code or deployment:
- Check deployment platform documentation
- Search Stack Overflow for React/deployment issues

---

**Your portfolio includes:**
- ✅ About section with your background
- ✅ Contact section with email, LinkedIn, Instagram
- ✅ 4 Professional sections (Legal Tech, Admin Law, Comparative Thinking, Essays)
- ✅ 2 Personal sections (Music, Photography)
- ✅ Comment system for visitor feedback
- ✅ Image and file upload support
- ✅ Responsive design
- ✅ Notion post auto-sync support

Good luck with your portfolio! 🎉
