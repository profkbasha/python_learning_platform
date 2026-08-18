import {
  initializeApp,
  getApps,
  getApp,
} from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
} from 'firebase/firestore';

import {
  getStorage,
} from 'firebase/storage';


const config = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// =====================================================
// FIREBASE APP
// =====================================================

const app =
  getApps().length
    ? getApp()
    : initializeApp(config);


// =====================================================
// FIRESTORE
// =====================================================

export const db =
  getFirestore(app);


// =====================================================
// AUTHENTICATION
// =====================================================
//
// Firebase Auth must only be initialized in the browser.
// Next.js also evaluates imported modules during SSR.
//
// Therefore we return null on the server and initialize
// Auth only in the browser.
//
// =====================================================

export const auth =
  typeof window !== 'undefined'
    ? getAuth(app)
    : null;


// =====================================================
// STORAGE
// =====================================================

export const storage =
  getStorage(app);


// =====================================================
// GOOGLE SIGN-IN PROVIDER
// =====================================================

export const googleProvider =
  new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});
