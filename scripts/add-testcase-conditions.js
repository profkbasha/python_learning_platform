require('dotenv').config({
  path: '.env.local'
});

const admin = require('firebase-admin');

admin.initializeApp({
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
});

const db = admin.firestore();

const updates = {
  problem_1_1_2_01: [
    {
      input: '10\n20',
      expectedOutput: '20',
      condition: 'Second number is larger'
    },
    {
      input: '50\n30',
      expectedOutput: '50',
      condition: 'First number is larger'
    },
    {
      input: '-5\n-2',
      expectedOutput: '-2',
      condition: 'Both numbers are negative; second number is larger'
    }
  ],

  problem_1_1_2_02: [
    {
      input: '10',
      expectedOutput: 'Even',
      condition: 'Number is even'
    },
    {
      input: '17',
      expectedOutput: 'Odd',
      condition: 'Number is odd'
    },
    {
      input: '0',
      expectedOutput: 'Even',
      condition: 'Zero is even'
    }
  ],

  problem_1_1_2_03: [
    {
      input: '95',
      expectedOutput: 'A',
      condition: 'Marks are in the 90–100 range'
    },
    {
      input: '82',
      expectedOutput: 'B',
      condition: 'Marks are in the 80–89 range'
    },
    {
      input: '74',
      expectedOutput: 'C',
      condition: 'Marks are in the 70–79 range'
    },
    {
      input: '45',
      expectedOutput: 'F',
      condition: 'Marks are below 60'
    }
  ]
};

async function main() {

  console.log('');
  console.log('===== ADDING TEST CASE CONDITIONS =====');

  for (const [id, testCases] of Object.entries(updates)) {

    await db
      .collection('topicSolutions')
      .doc(id)
      .set(
        {
          testCases
        },
        {
          merge: true
        }
      );

    console.log(
      `Updated ${id}: ${testCases.length} test cases`
    );
  }

  console.log('');
  console.log('DONE.');
}

main().catch(error => {
  console.error('ERROR:', error);
  process.exit(1);
});
