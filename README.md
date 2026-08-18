# Python Learning Platform — Firebase + Vercel

Mobile-first responsive Next.js application for Python teaching, practice, live coding and live presentation sessions.

## Features
- Google sign-in
- Student name + roll number profile linked to Firebase UID
- Responsive syllabus navigation
- Admin CMS for topics/content/code
- Browser Python execution using Pyodide Web Worker
- Live coding session with per-student temporary code
- Admin can see students and share one student's code to everyone
- Admin can clear live session data
- Firestore security rules with admin custom claim
- PPT conversion service foundation (deploy separately to Cloud Run if PPTX conversion is required)

## Setup
1. Create Firebase project.
2. Enable Authentication → Google.
3. Create Firestore Database and Storage.
4. Add a Web App in Firebase and copy its config into `.env.local`.
5. Deploy `firestore.rules`.
6. Install Node 20+ and run `npm install`.
7. Run `npm run dev`.
8. Deploy the repository to Vercel and add the same environment variables.

## Admin
Create your first user through Google login, obtain the Firebase UID from the Firebase console, then set the custom claim `admin=true` using Firebase Admin SDK. Refresh/re-login after changing claims.

## Important
Teaching content should be your own or content you are licensed to use. The project does not copy proprietary RankAchievers backend/source code.

## Live data policy
`livePractice/{uid}` is intended as temporary session data. The Admin “Clear Session Data” operation should be used at the end of a class. Permanent submissions can be added later as a separate collection if required.
