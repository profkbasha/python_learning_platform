const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

/*
  Exact syllabus structure from:
  syllabus for python(2).docx

  Structure:
  Unit
    └── Main Topic
          └── Sub Topic
*/

const topics = [
  // ============================================================
  // UNIT 1
  // ============================================================

  {
    id: '1.1',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1',
    title: 'Computational thinking',
    parentId: '',
    order: 1,
    content: ''
  },

  {
    id: '1.1.1',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.1',
    title: 'Characteristics',
    parentId: '1.1',
    order: 2,
    content: ''
  },

  {
    id: '1.1.2',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.2',
    title: 'problem-solving strategies',
    parentId: '1.1',
    order: 3,
    content: ''
  },

  {
    id: '1.1.3',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.3',
    title: 'steps in problem solving',
    parentId: '1.1',
    order: 4,
    content: ''
  },

  {
    id: '1.1.4',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.4',
    title: 'algorithms — definition and properties',
    parentId: '1.1',
    order: 5,
    content: ''
  },

  {
    id: '1.1.5',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.5',
    title: 'flowcharts — symbols and construction',
    parentId: '1.1',
    order: 6,
    content: ''
  },

  {
    id: '1.1.6',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.6',
    title: 'pseudo code — writing and conversion',
    parentId: '1.1',
    order: 7,
    content: ''
  },

  {
    id: '1.1.7',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.1.7',
    title: 'abstraction, decomposition, pattern recognition, algorithm efficiency basics',
    parentId: '1.1',
    order: 8,
    content: ''
  },

  {
    id: '1.2',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2',
    title: 'Introduction to Python',
    parentId: '',
    order: 9,
    content: ''
  },

  {
    id: '1.2.1',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.1',
    title: 'installation and execution environment',
    parentId: '1.2',
    order: 10,
    content: ''
  },

  {
    id: '1.2.2',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.2',
    title: 'variables, identifiers, keywords',
    parentId: '1.2',
    order: 11,
    content: ''
  },

  {
    id: '1.2.3',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.3',
    title: 'data types, type conversion',
    parentId: '1.2',
    order: 12,
    content: ''
  },

  {
    id: '1.2.4',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.4',
    title: 'input and output statements',
    parentId: '1.2',
    order: 13,
    content: ''
  },

  {
    id: '1.2.5',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.5',
    title: 'expressions and operators — arithmetic, relational, logical, assignment',
    parentId: '1.2',
    order: 14,
    content: ''
  },

  {
    id: '1.2.6',
    unitCode: '1',
    unitTitle: 'COMPUTATIONAL THINKING AND PROGRAMMING BASICS',
    code: '1.2.6',
    title: 'operator precedence',
    parentId: '1.2',
    order: 15,
    content: ''
  },

  // ============================================================
  // UNIT 2
  // ============================================================

  {
    id: '2.1',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.1',
    title: 'Decision control statements',
    parentId: '',
    order: 16,
    content: ''
  },

  {
    id: '2.1.1',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.1.1',
    title: 'Boolean expressions',
    parentId: '2.1',
    order: 17,
    content: ''
  },

  {
    id: '2.1.2',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.1.2',
    title: 'if, if-else, if-elif-else, nested if',
    parentId: '2.1',
    order: 18,
    content: ''
  },

  {
    id: '2.1.3',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.1.3',
    title: 'conditional expressions (ternary operator)',
    parentId: '2.1',
    order: 19,
    content: ''
  },

  {
    id: '2.2',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2',
    title: 'Looping statements',
    parentId: '',
    order: 20,
    content: ''
  },

  {
    id: '2.2.1',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2.1',
    title: 'while loop',
    parentId: '2.2',
    order: 21,
    content: ''
  },

  {
    id: '2.2.2',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2.2',
    title: 'for loop',
    parentId: '2.2',
    order: 22,
    content: ''
  },

  {
    id: '2.2.3',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2.3',
    title: 'iteration techniques',
    parentId: '2.2',
    order: 23,
    content: ''
  },

  {
    id: '2.2.4',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2.4',
    title: 'nested loops, infinite loops',
    parentId: '2.2',
    order: 24,
    content: ''
  },

  {
    id: '2.2.5',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.2.5',
    title: 'loop control — break, continue, pass; else with loops',
    parentId: '2.2',
    order: 25,
    content: ''
  },

  {
    id: '2.3',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.3',
    title: 'Practical problem solving',
    parentId: '',
    order: 26,
    content: ''
  },

  {
    id: '2.3.1',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.3.1',
    title: 'prime number check',
    parentId: '2.3',
    order: 27,
    content: ''
  },

  {
    id: '2.3.2',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.3.2',
    title: 'pattern programs using nested loops',
    parentId: '2.3',
    order: 28,
    content: ''
  },

  {
    id: '2.3.3',
    unitCode: '2',
    unitTitle: 'DECISION MAKING AND LOOPING',
    code: '2.3.3',
    title: 'menu-driven programs using control statements',
    parentId: '2.3',
    order: 29,
    content: ''
  },

  // ============================================================
  // UNIT 3
  // ============================================================

  {
    id: '3.1',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.1',
    title: 'Strings',
    parentId: '',
    order: 30,
    content: ''
  },

  {
    id: '3.1.1',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.1.1',
    title: 'representation, indexing, slicing',
    parentId: '3.1',
    order: 31,
    content: ''
  },

  {
    id: '3.1.2',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.1.2',
    title: 'operations, built-in functions and methods',
    parentId: '3.1',
    order: 32,
    content: ''
  },

  {
    id: '3.2',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.2',
    title: 'Lists',
    parentId: '',
    order: 33,
    content: ''
  },

  {
    id: '3.2.1',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.2.1',
    title: 'creation, indexing and slicing',
    parentId: '3.2',
    order: 34,
    content: ''
  },

  {
    id: '3.2.2',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.2.2',
    title: 'operations, functions',
    parentId: '3.2',
    order: 35,
    content: ''
  },

  {
    id: '3.2.3',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.2.3',
    title: 'methods, nested lists',
    parentId: '3.2',
    order: 36,
    content: ''
  },

  {
    id: '3.3',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.3',
    title: 'Tuples',
    parentId: '',
    order: 37,
    content: ''
  },

  {
    id: '3.3.1',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.3.1',
    title: 'creation, operations',
    parentId: '3.3',
    order: 38,
    content: ''
  },

  {
    id: '3.3.2',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.3.2',
    title: 'packing and unpacking',
    parentId: '3.3',
    order: 39,
    content: ''
  },

  {
    id: '3.4',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.4',
    title: 'Sets',
    parentId: '',
    order: 40,
    content: ''
  },

  {
    id: '3.4.1',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.4.1',
    title: 'creation, set operations — union, intersection, difference',
    parentId: '3.4',
    order: 41,
    content: ''
  },

  {
    id: '3.4.2',
    unitCode: '3',
    unitTitle: 'STRINGS AND DATA STRUCTURES',
    code: '3.4.2',
    title: 'frozen sets',
    parentId: '3.4',
    order: 42,
    content: ''
  },

  // ============================================================
  // UNIT 4
  // ============================================================

  {
    id: '4.1',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.1',
    title: 'Dictionaries',
    parentId: '',
    order: 43,
    content: ''
  },

  {
    id: '4.1.1',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.1.1',
    title: 'creation, operations',
    parentId: '4.1',
    order: 44,
    content: ''
  },

  {
    id: '4.1.2',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.1.2',
    title: 'methods; dictionary-based applications',
    parentId: '4.1',
    order: 45,
    content: ''
  },

  {
    id: '4.2',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.2',
    title: 'Functions',
    parentId: '',
    order: 46,
    content: ''
  },

  {
    id: '4.2.1',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.2.1',
    title: 'built-in and user-defined functions',
    parentId: '4.2',
    order: 47,
    content: ''
  },

  {
    id: '4.2.2',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.2.2',
    title: 'function definition and calling',
    parentId: '4.2',
    order: 48,
    content: ''
  },

  {
    id: '4.2.3',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.2.3',
    title: 'arguments — positional, keyword, default, variable-length',
    parentId: '4.2',
    order: 49,
    content: ''
  },

  {
    id: '4.2.4',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.2.4',
    title: 'scope of variables (local and global)',
    parentId: '4.2',
    order: 50,
    content: ''
  },

  {
    id: '4.3',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.3',
    title: 'Recursion',
    parentId: '',
    order: 51,
    content: ''
  },

  {
    id: '4.3.1',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.3.1',
    title: 'recursive functions — factorial, Fibonacci',
    parentId: '4.3',
    order: 52,
    content: ''
  },

  {
    id: '4.3.2',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.3.2',
    title: 'lambda functions (anonymous functions)',
    parentId: '4.3',
    order: 53,
    content: ''
  },

  {
    id: '4.3.3',
    unitCode: '4',
    unitTitle: 'FUNCTIONS AND PROBLEM SOLVING',
    code: '4.3.3',
    title: 'applications of functions in problem solving',
    parentId: '4.3',
    order: 54,
    content: ''
  },

  // ============================================================
  // UNIT 5
  // ============================================================

  {
    id: '5.1',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.1',
    title: 'Modules and packages',
    parentId: '',
    order: 55,
    content: ''
  },

  {
    id: '5.1.1',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.1.1',
    title: 'creating and importing modules',
    parentId: '5.1',
    order: 56,
    content: ''
  },

  {
    id: '5.1.2',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.1.2',
    title: 'standard library modules',
    parentId: '5.1',
    order: 57,
    content: ''
  },

  {
    id: '5.2',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.2',
    title: 'File handling',
    parentId: '',
    order: 58,
    content: ''
  },

  {
    id: '5.2.1',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.2.1',
    title: 'opening, reading, writing, and closing files; file modes; working with text files; processing CSV and Excel files',
    parentId: '5.2',
    order: 59,
    content: ''
  },

  {
    id: '5.3',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.3',
    title: 'Exception handling',
    parentId: '',
    order: 60,
    content: ''
  },

  {
    id: '5.3.1',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.3.1',
    title: 'types of errors (syntax, runtime, logical)',
    parentId: '5.3',
    order: 61,
    content: ''
  },

  {
    id: '5.3.2',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.3.2',
    title: 'try, except, finally blocks',
    parentId: '5.3',
    order: 62,
    content: ''
  },

  {
    id: '5.3.3',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.3.3',
    title: 'raising exceptions',
    parentId: '5.3',
    order: 63,
    content: ''
  },

  {
    id: '5.4',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.4',
    title: 'Introduction to OOP',
    parentId: '',
    order: 64,
    content: ''
  },

  {
    id: '5.4.1',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.4.1',
    title: 'classes, objects, attributes, methods',
    parentId: '5.4',
    order: 65,
    content: ''
  },

  {
    id: '5.4.2',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.4.2',
    title: 'constructors, self keyword',
    parentId: '5.4',
    order: 66,
    content: ''
  },

  {
    id: '5.4.3',
    unitCode: '5',
    unitTitle: 'FILE HANDLING, EXCEPTION HANDLING, AND OOP',
    code: '5.4.3',
    title: 'basic applications of OOP in Python',
    parentId: '5.4',
    order: 67,
    content: ''
  }
];

async function seed() {
  try {
    console.log('Starting syllabus seed...');

    // ------------------------------------------------------------
    // Delete existing topics
    // ------------------------------------------------------------

    console.log('Removing existing topics...');

    const existing = await db.collection('topics').get();

    if (!existing.empty) {
      const batch = db.batch();

      existing.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      console.log(`Deleted ${existing.size} existing topics.`);
    } else {
      console.log('No existing topics found.');
    }

    // ------------------------------------------------------------
    // Add topics using syllabus code as Firestore document ID
    // ------------------------------------------------------------

    for (const topic of topics) {
      const { id, ...data } = topic;

      await db.collection('topics').doc(id).set({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });

      console.log(`Added: ${topic.code} - ${topic.title}`);
    }

    console.log('');
    console.log(`DONE. ${topics.length} topics added.`);
    console.log('');
    console.log('Hierarchy is now:');
    console.log('Unit → 1.1 / 1.2 → 1.1.1 / 1.1.2 / ...');
    console.log('');
  } catch (error) {
    console.error('SEED ERROR:', error);
    process.exit(1);
  }
}

seed();
