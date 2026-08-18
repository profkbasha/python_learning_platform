// Firebase Admin SDK one-time script. Install firebase-admin and set GOOGLE_APPLICATION_CREDENTIALS.
const admin=require('firebase-admin');admin.initializeApp();const uid=process.argv[2];if(!uid)throw new Error('Usage: node functions/setAdmin.js FIREBASE_UID');admin.auth().setCustomUserClaims(uid,{admin:true}).then(()=>console.log('Admin claim set for',uid)).catch(console.error);
