require('dotenv').config({
  path: '.env.local',
});

const admin = require('firebase-admin');

const projectId =
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!projectId) {
  throw new Error(
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing from .env.local'
  );
}

admin.initializeApp({
  projectId,
});

const db = admin.firestore();

async function main() {
  console.log('Starting public lab-problem seed...');

  const snapshot = await db
    .collection('topicSolutions')
    .get();

  let count = 0;

  for (const document of snapshot.docs) {
    const data = document.data();

    const publicProblem = {
      topicId: data.topicId || '',
      topicCode: data.topicCode || '',
      topicTitle: data.topicTitle || '',
      problemId: data.problemId || '',
      title: data.title || '',
      problem: data.problem || '',

      testCases:
        Array.isArray(data.testCases)
          ? data.testCases
          : [],

      order: data.order || count,

      updatedAt:
        admin.firestore.FieldValue.serverTimestamp(),
    };

    await db
      .collection('labProblems')
      .doc(document.id)
      .set(publicProblem, {
        merge: true,
      });

    console.log(
      `Added/updated: ${data.topicCode} - ${data.title}`
    );

    count++;
  }

  console.log('');
  console.log(
    `DONE. ${count} public lab problems created.`
  );
}

main().catch((error) => {
  console.error(
    'LAB PROBLEM SEED ERROR:',
    error
  );

  process.exit(1);
});
