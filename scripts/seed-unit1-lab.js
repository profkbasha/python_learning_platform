const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const labs = [
  {
    topicCode: '1.1.4',
    topicTitle: 'algorithms — definition and properties',
    problems: [
      {
        problemId: 'largest-two',
        title: 'Find the Largest of Two Numbers',
        problem:
          'Write a program to accept two numbers and find the largest number.',
        solution: `a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

if a > b:
    print("Largest:", a)
else:
    print("Largest:", b)`,
      },
      {
        problemId: 'even-odd',
        title: 'Check Whether a Number is Even or Odd',
        problem:
          'Write a program to accept a number and determine whether it is even or odd.',
        solution: `n = int(input("Enter a number: "))

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
      },
      {
        problemId: 'factorial',
        title: 'Find the Factorial of a Number',
        problem:
          'Write a program to accept a number and calculate its factorial.',
        solution: `n = int(input("Enter a number: "))

factorial = 1

for i in range(1, n + 1):
    factorial *= i

print("Factorial:", factorial)`,
      },
    ],
  },

  {
    topicCode: '1.1.5',
    topicTitle: 'flowcharts — symbols and construction',
    problems: [
      {
        problemId: 'flow-largest-two',
        title: 'Flowchart — Largest of Two Numbers',
        problem:
          'Construct a flowchart for finding the largest of two numbers and then implement the equivalent Python program.',
        solution: `a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

if a > b:
    print("Largest:", a)
else:
    print("Largest:", b)`,
      },
      {
        problemId: 'flow-even-odd',
        title: 'Flowchart — Even or Odd',
        problem:
          'Construct a flowchart for checking whether a number is even or odd and implement the equivalent Python program.',
        solution: `n = int(input("Enter a number: "))

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
      },
      {
        problemId: 'flow-factorial',
        title: 'Flowchart — Factorial',
        problem:
          'Construct a flowchart for calculating the factorial of a number and implement the equivalent Python program.',
        solution: `n = int(input("Enter a number: "))

factorial = 1

for i in range(1, n + 1):
    factorial *= i

print("Factorial:", factorial)`,
      },
    ],
  },

  {
    topicCode: '1.1.6',
    topicTitle: 'pseudo code — writing and conversion',
    problems: [
      {
        problemId: 'pseudo-largest-two',
        title: 'Pseudocode — Largest of Two Numbers',
        problem:
          'Write pseudocode for finding the largest of two numbers and convert it into Python.',
        solution: `BEGIN
    READ A
    READ B

    IF A > B THEN
        PRINT A
    ELSE
        PRINT B
    END IF
END

# Python implementation

a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

if a > b:
    print("Largest:", a)
else:
    print("Largest:", b)`,
      },
      {
        problemId: 'pseudo-even-odd',
        title: 'Pseudocode — Even or Odd',
        problem:
          'Write pseudocode for checking whether a number is even or odd and convert it into Python.',
        solution: `BEGIN
    READ N

    IF N MOD 2 = 0 THEN
        PRINT "Even"
    ELSE
        PRINT "Odd"
    END IF
END

# Python implementation

n = int(input("Enter a number: "))

if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
      },
      {
        problemId: 'pseudo-factorial',
        title: 'Pseudocode — Factorial',
        problem:
          'Write pseudocode for calculating factorial and convert it into Python.',
        solution: `BEGIN
    READ N
    FACTORIAL = 1

    FOR I = 1 TO N
        FACTORIAL = FACTORIAL * I
    END FOR

    PRINT FACTORIAL
END

# Python implementation

n = int(input("Enter a number: "))

factorial = 1

for i in range(1, n + 1):
    factorial *= i

print("Factorial:", factorial)`,
      },
    ],
  },

  {
    topicCode: '1.2.2',
    topicTitle: 'variables, identifiers, keywords',
    problems: [
      {
        problemId: 'primitive-types',
        title: 'Primitive Data Types',
        problem:
          'Declare variables of int, float, complex, bool and str types and display their types using type().',
        solution: `a = 10
b = 10.5
c = 2 + 3j
d = True
e = "Python"

print(a, type(a))
print(b, type(b))
print(c, type(c))
print(d, type(d))
print(e, type(e))`,
      },
      {
        problemId: 'formatted-bill',
        title: 'Formatted Bill',
        problem:
          'Accept item name, quantity and price. Calculate and display the total using f-string formatting with two decimal places.',
        solution: `item = input("Enter item name: ")
quantity = int(input("Enter quantity: "))
price = float(input("Enter price: "))

total = quantity * price

print("\\n----- BILL -----")
print(f"Item     : {item}")
print(f"Quantity : {quantity}")
print(f"Price    : ₹{price:.2f}")
print(f"Total    : ₹{total:.2f}")`,
      },
    ],
  },

  {
    topicCode: '1.2.3',
    topicTitle: 'data types, type conversion',
    problems: [
      {
        problemId: 'type-conversion',
        title: 'Implicit and Explicit Type Conversion',
        problem:
          'Demonstrate conversion between int, float and str using Python conversion functions.',
        solution: `# Integer to float
a = 10
b = float(a)
print("int to float:", b)

# Float to integer
c = 10.75
d = int(c)
print("float to int:", d)

# Integer to string
e = 100
f = str(e)
print("int to str:", f, type(f))

# String to integer
g = "250"
h = int(g)
print("str to int:", h, type(h))`,
      },
    ],
  },

  {
    topicCode: '1.2.4',
    topicTitle: 'input and output statements',
    problems: [
      {
        problemId: 'circle',
        title: 'Area and Circumference of a Circle',
        problem:
          'Accept the radius of a circle and calculate its area and circumference using the math module.',
        solution: `import math

r = float(input("Enter radius: "))

area = math.pi * r * r
circumference = 2 * math.pi * r

print(f"Area          : {area:.2f}")
print(f"Circumference : {circumference:.2f}")`,
      },
      {
        problemId: 'result-card',
        title: 'Student Result Card',
        problem:
          'Accept three subject marks. Calculate total, percentage and grade and display a formatted result card.',
        solution: `m1 = float(input("Enter Subject 1 marks: "))
m2 = float(input("Enter Subject 2 marks: "))
m3 = float(input("Enter Subject 3 marks: "))

total = m1 + m2 + m3
percentage = total / 3

if percentage >= 90:
    grade = "O"
elif percentage >= 80:
    grade = "A+"
elif percentage >= 70:
    grade = "A"
elif percentage >= 60:
    grade = "B+"
elif percentage >= 50:
    grade = "B"
elif percentage >= 40:
    grade = "C"
else:
    grade = "F"

print("\\n----- RESULT CARD -----")
print(f"Total      : {total:.2f}")
print(f"Percentage : {percentage:.2f}%")
print(f"Grade      : {grade}")`,
      },
    ],
  },

  {
    topicCode: '1.2.5',
    topicTitle:
      'expressions and operators — arithmetic, relational, logical, assignment',
    problems: [
      {
        problemId: 'operators',
        title: 'Demonstrate Python Operators',
        problem:
          'Demonstrate arithmetic, relational, logical, bitwise and assignment operators with examples.',
        solution: `a = 10
b = 3

# Arithmetic
print("Addition:", a + b)
print("Subtraction:", a - b)
print("Multiplication:", a * b)
print("Division:", a / b)
print("Floor division:", a // b)
print("Modulus:", a % b)
print("Power:", a ** b)

# Relational
print("Equal:", a == b)
print("Not equal:", a != b)
print("Greater:", a > b)
print("Less:", a < b)

# Logical
print("AND:", a > 5 and b < 5)
print("OR:", a < 5 or b < 5)
print("NOT:", not(a > 5))

# Bitwise
print("AND:", a & b)
print("OR:", a | b)
print("XOR:", a ^ b)
print("NOT:", ~a)
print("Left shift:", a << 1)
print("Right shift:", a >> 1)

# Assignment
x = 10
x += 5
print("After +=:", x)
x *= 2
print("After *=:", x)`,
      },
      {
        problemId: 'expression-evaluation',
        title: 'Expression Evaluation',
        problem:
          'Accept two numbers and an operator (+, -, *, /), evaluate the expression and handle division by zero.',
        solution: `a = float(input("Enter first number: "))
op = input("Enter operator (+, -, *, /): ")
b = float(input("Enter second number: "))

if op == "+":
    result = a + b
elif op == "-":
    result = a - b
elif op == "*":
    result = a * b
elif op == "/":
    if b == 0:
        print("Error: Division by zero")
    else:
        result = a / b
else:
    print("Invalid operator")

if op in ["+", "-", "*"] or (op == "/" and b != 0):
    print("Result:", result)`,
      },
    ],
  },

  {
    topicCode: '1.2.6',
    topicTitle: 'operator precedence',
    problems: [
      {
        problemId: 'precedence',
        title: 'Operator Precedence',
        problem:
          'Predict the result of mixed expressions manually and then verify the results using Python.',
        solution: `expressions = [
    "5 + 3 * 2",
    "(5 + 3) * 2",
    "10 - 4 + 2",
    "2 ** 3 * 2",
    "20 / 5 + 3 * 2"
]

for expression in expressions:
    result = eval(expression)
    print(f"{expression} = {result}")`,
      },
    ],
  },
];

async function main() {
  console.log('Starting Unit 1 lab solution seed...');

  const snapshot = await db
    .collection('topics')
    .get();

  const topicsByCode = {};

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (data.code) {
      topicsByCode[data.code] = {
        id: doc.id,
        ...data,
      };
    }
  });

  let added = 0;

  for (const lab of labs) {
    const topic = topicsByCode[lab.topicCode];

    if (!topic) {
      console.log(`SKIPPED: Topic ${lab.topicCode} not found`);
      continue;
    }

    for (const problem of lab.problems) {
      const id = `${lab.topicCode}-${problem.problemId}`;

      await db.collection('topicSolutions').doc(id).set(
        {
          topicId: topic.id,
          topicCode: lab.topicCode,
          topicTitle: topic.title,

          problemId: problem.problemId,
          title: problem.title,
          problem: problem.problem,
          solution: problem.solution,

          visible: false,
          order: added,

          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log(
        `Added/updated: ${lab.topicCode} - ${problem.title}`
      );

      added++;
    }
  }

  console.log('');
  console.log(`DONE. ${added} lab problems prepared.`);
  console.log('All solutions are currently HIDDEN.');
}

main().catch((error) => {
  console.error('LAB SEED ERROR:', error);
  process.exit(1);
});
