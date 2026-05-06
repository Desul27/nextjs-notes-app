📝 Next.js Notes App

A modern full-stack notes application built with Next.js App Router, featuring clean UI, smooth UX, and a solid backend setup.

🚀 Live Demo

👉 https://nextjs-notes-app-seven.vercel.app/

## ✨ Features

- Create, Read, Update, Delete Notes
- REST API with Next.js Route Handlers
- PostgreSQL Database (Supabase)
- Prisma ORM
- Dark Mode
- Responsive UI
- Online Deployment with Vercel

🎯 Smooth UX:
Auto-focus input
Enter to submit
Inline edit experience
🧩 Component-based architecture (e.g., NoteItem)
🔄 Real-time UI updates (no refresh needed)

🛠 Tech Stack
Framework: Next.js (App Router)
Database: Prisma ORM + PostgreSQL (Supabase)
Styling: CSS Modules / Vanilla CSS
Deployment: Vercel

📂 Project Structure (Simplified)
app/
 ├── api/notes        # API routes (CRUD)
 ├── page.tsx         # Main UI
components/
 └── NoteItem.tsx     # Note component
lib/
 └── prisma.ts        # Prisma client


⚙️ Getting Started
1. Clone repo
git clone https://github.com/Desul27/nextjs-notes-app.git
cd nextjs-notes-app
2. Install dependencies
npm install
3. Setup database
npx prisma migrate dev
4. Run development server
npm run dev
npx prisma generate
npm run dev
🌍 Deployment

This project is deployed on Vercel.

To deploy your own:

Push project to GitHub
Import to Vercel
Deploy

⚠️ Notes
## 🚧 Future Improvements
- Authentication
- Row Level Security (RLS)
- User-specific notes
- Better mobile experience
- Toast notifications

👤 Author
Dede Sulaeni

💡 Why this project?

This project was built to practice full-stack development using Next.js App Router, focusing on clean architecture, user experience, and real-world deployment workflow.