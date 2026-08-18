const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const lessons = {

  "1.1": {
    introduction: `Computational thinking is a systematic way of approaching problems so that solutions can be expressed clearly and logically. It helps us understand a problem, break it into manageable parts, identify useful patterns, ignore unnecessary details, and design a sequence of steps for solving it.`,

    learningObjectives: `Explain the meaning of computational thinking
Describe the major characteristics of computational thinking
Relate computational thinking to problem solving
Apply computational thinking to simple everyday and programming problems`,

    explanation: `Computational thinking is a problem-solving approach used in computer science and many other areas. It does not mean thinking like a computer literally. Instead, it means solving problems in a structured way that can be understood, followed, tested, and implemented by a computer when appropriate.

A typical computational-thinking process involves understanding the problem, decomposing it into smaller parts, recognizing patterns, creating an abstraction of the important information, and developing an algorithm or sequence of steps.

For example, suppose a teacher wants to prepare a student result report. Instead of treating the complete task as one large problem, it can be divided into smaller tasks such as reading student details, calculating totals, calculating averages, determining grades, and producing the report.

Computational thinking makes complex problems easier to understand and solve. It also encourages solutions that are systematic, repeatable, and testable.`,

    keyPoints: `Computational thinking is a systematic problem-solving approach
It is not limited to programming
Decomposition divides a complex problem into smaller parts
Pattern recognition identifies similarities
Abstraction focuses on important information
Algorithmic thinking develops step-by-step solutions`,

    exampleTitle: "Example: Student Result Processing",

    exampleExplanation: `Suppose a teacher needs to calculate the result of many students. The task can be decomposed into collecting marks, calculating totals, calculating averages, assigning grades, and displaying results. Similar calculations are repeated, so a pattern can be recognized. Only relevant student information is required, which is abstraction. The complete process can then be represented as an algorithm.`,

    codeExample: `marks = [78, 85, 69, 91, 74]

total = sum(marks)
average = total / len(marks)

print("Total:", total)
print("Average:", average)`,

    expectedOutput: `Total: 397
Average: 79.4`,

    practiceQuestion: `Identify how decomposition, pattern recognition, abstraction, and algorithmic thinking can be used to solve a student-result problem.`,

    practiceInstructions: `Write the major problem-solving steps before writing the Python program.`,

    practiceStarterCode: `# Step 1:
# Step 2:
# Step 3:
# Step 4:`,

    importantNotes: `Computational thinking is broader than programming. Programming is one way of implementing a solution developed through problem solving.`,

    summary: `Computational thinking provides a structured way to understand and solve problems.`
  },


  "1.1.1": {
    introduction: `The characteristics of computational thinking describe the important ways in which a problem can be understood and transformed into a solution.`,

    learningObjectives: `Define the major characteristics of computational thinking
Explain decomposition
Explain pattern recognition
Explain abstraction
Explain algorithmic thinking`,

    explanation: `The major characteristics of computational thinking include decomposition, pattern recognition, abstraction, and algorithmic thinking.

Decomposition means breaking a large or complex problem into smaller and more manageable parts.

Pattern recognition means identifying similarities, repetitions, or relationships between problems or parts of a problem.

Abstraction means concentrating on important information while ignoring unnecessary details.

Algorithmic thinking means developing a clear sequence of steps that can be followed to solve a problem.

These characteristics work together. A problem can first be decomposed, patterns can be identified, unnecessary details can be ignored through abstraction, and an algorithm can finally be designed.`,

    keyPoints: `Decomposition — break a problem into smaller parts
Pattern recognition — identify similarities and repetition
Abstraction — focus on relevant information
Algorithmic thinking — design ordered steps
The characteristics are often used together`,

    exampleTitle: "Example: ATM Withdrawal",

    exampleExplanation: `An ATM withdrawal can be divided into card verification, PIN verification, balance checking, amount validation, cash dispensing, and receipt generation. These smaller tasks demonstrate decomposition. The repeated verification process demonstrates pattern recognition. Only relevant banking information is required, demonstrating abstraction. The complete operation can be expressed as an ordered algorithm.`,

    codeExample: `balance = 5000
amount = 1500

if amount <= balance:
    balance = balance - amount
    print("Withdrawal successful")
    print("Remaining balance:", balance)
else:
    print("Insufficient balance")`,

    expectedOutput: `Withdrawal successful
Remaining balance: 3500`,

    practiceQuestion: `For an online food-ordering system, identify decomposition, pattern recognition, abstraction, and algorithmic thinking.`,

    practiceInstructions: `Write one or two sentences for each characteristic.`,

    practiceStarterCode: `# Decomposition:
#
# Pattern recognition:
#
# Abstraction:
#
# Algorithmic thinking:`,

    importantNotes: `A problem may contain several computational-thinking characteristics at the same time.`,

    summary: `The characteristics of computational thinking help transform complex problems into structured and manageable solutions.`
  },


  "1.1.2": {
    introduction: `Problem-solving strategies are systematic approaches used to understand a problem and develop an appropriate solution.`,

    learningObjectives: `Identify common problem-solving strategies
Understand inputs and outputs
Break complex problems into smaller tasks
Use examples to understand a problem
Test and refine solutions`,

    explanation: `A good problem-solving process begins by clearly understanding the problem. The problem should be stated precisely, including what is known, what must be produced, and what restrictions apply.

Useful strategies include decomposition, working with examples, identifying patterns, simplifying a problem, developing a step-by-step solution, testing the solution, and refining it when necessary.

For a programming problem, identify the inputs and outputs before writing code. For example, in a problem that calculates an average, the input may be a collection of marks and the output may be the average.

Testing should include suitable normal cases and, when appropriate, boundary or unusual cases.`,

    keyPoints: `Understand the problem before coding
Identify inputs and outputs
Break complex problems into smaller tasks
Use examples
Develop a step-by-step solution
Test the solution
Refine the solution when necessary`,

    exampleTitle: "Example: Finding the Largest Number",

    exampleExplanation: `To find the largest of three numbers, identify the three numbers as input and the largest number as output. Keep one number as the current largest and compare the remaining numbers with it.`,

    codeExample: `a = 25
b = 42
c = 31

largest = a

if b > largest:
    largest = b

if c > largest:
    largest = c

print("Largest:", largest)`,

    expectedOutput: `Largest: 42`,

    practiceQuestion: `Develop a problem-solving strategy for finding the smallest of three numbers.`,

    practiceInstructions: `Write the input, output, major steps, and one test case.`,

    practiceStarterCode: `# Input:
#
# Output:
#
# Step 1:
# Step 2:
# Step 3:
#
# Test case:`,

    importantNotes: `Avoid immediately writing code when the problem is not yet understood.`,

    summary: `Problem-solving strategies provide a disciplined way to move from a problem statement to a tested solution.`
  },


  "1.1.3": {
    introduction: `Steps in problem solving provide a disciplined sequence for moving from a problem statement to a working solution.`,

    learningObjectives: `Explain the major steps in problem solving
Identify inputs, outputs, rules, and constraints
Describe algorithm design
Explain implementation, testing, debugging, and evaluation`,

    explanation: `A disciplined problem-solving process can be organized into the following steps.

1. Problem definition — clearly state what needs to be solved.
2. Problem analysis — identify inputs, outputs, rules, assumptions, and constraints.
3. Solution design — decide how the problem should be solved.
4. Algorithm design — write the solution as an ordered sequence of steps.
5. Implementation — convert the algorithm into Python code.
6. Testing — execute the program using suitable test cases.
7. Debugging — identify and correct errors.
8. Evaluation — determine whether the final solution satisfies the original requirements.

Computational thinking can be applied throughout this process. Decomposition helps during analysis, pattern recognition identifies repeated structures, abstraction simplifies the problem, and algorithmic thinking helps design the solution.`,

    keyPoints: `Problem definition
Problem analysis
Solution design
Algorithm design
Implementation
Testing
Debugging
Evaluation`,

    exampleTitle: "Example: Largest of Three Numbers",

    exampleExplanation: `Problem definition: Find the largest among three numbers.

Analysis: Inputs are three numbers and output is the largest number.

Design: Start with the first number as the current largest and compare the other two numbers.

Testing: Test different values, equal values, and negative values.`,

    codeExample: `a = 12
b = 7
c = 19

largest = a

if b > largest:
    largest = b

if c > largest:
    largest = c

print("Largest:", largest)`,

    expectedOutput: `Largest: 19`,

    practiceQuestion: `Apply the complete problem-solving process to calculating the average of five numbers.`,

    practiceInstructions: `Write the problem definition, analysis, algorithm, implementation plan, and two test cases.`,

    practiceStarterCode: `# Problem definition:
#
# Analysis:
#
# Algorithm:
#
# Test case 1:
#
# Test case 2:`,

    importantNotes: `Testing reveals whether a program behaves correctly for selected inputs. Debugging is the process of locating and correcting errors.`,

    summary: `Problem solving is a complete process from defining the problem to evaluating the final solution.`
  },


  "1.1.4": {
    introduction: `An algorithm is a finite and ordered sequence of unambiguous steps designed to solve a problem or perform a task.`,

    learningObjectives: `Define an algorithm
Explain important properties of an algorithm
Identify clear and unambiguous steps
Write an algorithm for a simple problem`,

    explanation: `An algorithm describes how a problem can be solved before the solution is implemented in a programming language.

Important properties include finiteness, definiteness, input, output, and effectiveness.

Finiteness means the algorithm should terminate after a finite number of steps.

Definiteness means each step should be clear and unambiguous.

Input identifies the information supplied to the algorithm.

Output identifies the result produced by the algorithm.

Effectiveness means the operations should be basic enough to be carried out in practice.

An algorithm is generally language independent. The same algorithm can be implemented in Python, C, Java, or another language.`,

    keyPoints: `An algorithm is a sequence of steps
Steps should be clear and unambiguous
An algorithm should terminate
Inputs and outputs should be identified
An algorithm should be language independent
Algorithms can be implemented in different programming languages`,

    exampleTitle: "Algorithm: Area of a Rectangle",

    exampleExplanation: `Input: length and width.

Process: Multiply length by width.

Output: area.

Algorithm:
1. Start.
2. Read length.
3. Read width.
4. Calculate area = length × width.
5. Display area.
6. Stop.`,

    codeExample: `length = 10
width = 5

area = length * width

print("Area:", area)`,

    expectedOutput: `Area: 50`,

    practiceQuestion: `Write an algorithm to calculate simple interest when principal, rate, and time are given.`,

    practiceInstructions: `Clearly identify input, processing, output, and termination.`,

    practiceStarterCode: `# Algorithm:
# 1.
# 2.
# 3.
# 4.
# 5.`,

    importantNotes: `An algorithm expresses solution logic. Python code implements that logic in a programming language.`,

    summary: `Algorithms provide clear, finite, and language-independent steps for solving problems.`
  },


  "1.1.5": {
    introduction: `A flowchart is a graphical representation of an algorithm. It uses standard symbols connected by arrows to show the sequence and flow of operations.`,

    learningObjectives: `Explain the purpose of a flowchart
Identify common flowchart symbols
Construct a simple flowchart
Convert an algorithm into a flowchart`,

    explanation: `Flowcharts represent algorithms visually. They help us understand the sequence of operations and the points where decisions or repetitions occur.

Common symbols include the oval for Start/End, rectangle for Process, parallelogram for Input/Output, diamond for Decision, and arrows for flow direction.

A flowchart should normally have a clear starting point and ending point. Decision branches should be clearly identified, such as Yes/No or True/False.

Flowcharts are useful during solution design because the logic can be reviewed before code is written.`,

    keyPoints: `Oval — Start/End
Rectangle — Process
Parallelogram — Input/Output
Diamond — Decision
Arrow — Flow direction`,

    exampleTitle: "Example: Even or Odd",

    exampleExplanation: `The algorithm reads a number and checks whether the remainder after division by 2 is zero. The decision is represented by a diamond in the flowchart.`,

    codeExample: `number = 18

if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,

    expectedOutput: `Even`,

    practiceQuestion: `Draw a flowchart for finding the largest of two numbers.`,

    practiceInstructions: `Use Start/End, Input, Decision, Output, and arrows. Clearly label the decision branches.`,

    practiceStarterCode: `# Draw the flowchart on paper
# or using a flowchart tool.`,

    importantNotes: `Use standard symbols consistently. A flowchart should communicate the logic clearly.`,

    summary: `Flowcharts provide a visual representation of algorithms and make sequence, decisions, and flow easier to understand.`
  },


  "1.1.6": {
    introduction: `Pseudocode is an informal, structured way of writing the logic of an algorithm using simple language-like statements without following the exact syntax of a programming language.`,

    learningObjectives: `Define pseudocode
Explain the purpose of pseudocode
Write pseudocode for a simple problem
Convert pseudocode into Python code`,

    explanation: `Pseudocode acts as a bridge between an algorithm and program code. It focuses on solution logic rather than programming-language syntax.

Pseudocode commonly uses words such as START, INPUT, OUTPUT, IF, ELSE, WHILE, and FOR.

Good pseudocode should be clear, logically ordered, and easy to translate into code.

Example:

START
INPUT number
IF number MOD 2 = 0 THEN
    OUTPUT "Even"
ELSE
    OUTPUT "Odd"
END IF
STOP

This can then be translated into Python syntax.`,

    keyPoints: `Pseudocode is language independent
It focuses on logic rather than syntax
It uses structured English-like statements
It helps convert algorithms into programs
It should be clear and logically ordered`,

    exampleTitle: "Example: Even or Odd",

    exampleExplanation: `Pseudocode describes the decision using language-independent steps. Python then implements the same logic using the modulo operator and if-else statement.`,

    codeExample: `number = int(input("Enter a number: "))

if number % 2 == 0:
    print("Even")
else:
    print("Odd")`,

    expectedOutput: `Enter a number: 17
Odd`,

    practiceQuestion: `Write pseudocode for finding the largest of three numbers and then convert it into Python.`,

    practiceInstructions: `First write the logic without Python syntax. Then implement the same logic using Python.`,

    practiceStarterCode: `# Pseudocode:
#
# START
# INPUT ...
# ...
# STOP

# Python implementation:`,

    importantNotes: `Pseudocode is intended to express logic in a language-independent form.`,

    summary: `Pseudocode provides a simple bridge between an algorithm and an actual program.`
  },


  "1.1.7": {
    introduction: `Abstraction, decomposition, pattern recognition, and algorithm efficiency are important ideas for developing effective computational solutions.`,

    learningObjectives: `Explain abstraction
Explain decomposition
Identify patterns
Explain the basic idea of algorithm efficiency
Apply these ideas to a simple problem`,

    explanation: `Abstraction focuses on the information that is important for solving a problem while ignoring unnecessary detail.

Decomposition breaks a complex problem into smaller tasks. Each task can be understood, tested, and developed independently.

Pattern recognition identifies repeated structures or similarities. If the same operation occurs many times, it may be represented with a loop or reusable function.

Algorithm efficiency is a basic measure of how much computational work or resources an algorithm requires as the input size grows.

These ideas help produce solutions that are clear, reusable, and manageable.`,

    keyPoints: `Abstraction removes unnecessary detail
Decomposition breaks complex problems into smaller tasks
Pattern recognition identifies repeated structures
Algorithm efficiency considers computational work and resources
These ideas support better algorithm design`,

    exampleTitle: "Example: Searching a List",

    exampleExplanation: `A simple search checks elements one by one until the required value is found. The amount of work depends on the position of the value and the size of the list.`,

    codeExample: `numbers = [12, 25, 31, 44, 58]
target = 31

found = False

for number in numbers:
    if number == target:
        found = True
        break

print("Found:", found)`,

    expectedOutput: `Found: True`,

    practiceQuestion: `For a student-mark processing system, identify what information could be abstracted and how the problem could be decomposed.`,

    practiceInstructions: `Give at least three smaller tasks and identify at least two important pieces of information.`,

    practiceStarterCode: `# Decomposition:
# 1.
# 2.
# 3.

# Important information:
# 1.
# 2.`,

    importantNotes: `Algorithm efficiency is introduced here at a basic conceptual level.`,

    summary: `Abstraction, decomposition, pattern recognition, and basic efficiency thinking help produce better computational solutions.`
  },


  "1.2": {
    introduction: `Python is a high-level programming language used for learning programming, automation, data processing, scientific computing, web development, artificial intelligence, and many other applications.`,

    learningObjectives: `Explain what Python is
Identify the role of the Python interpreter
Describe the basic process of writing and executing a Python program
Distinguish source code from program execution`,

    explanation: `Python programs are written as source code and executed by the Python interpreter. Python provides readable syntax and a large standard library.

A Python program can be written in a source file with the .py extension. The interpreter executes the statements according to Python's rules.

Python can be used interactively, where statements are entered one at a time, or through script files containing a complete program.

The basic workflow is: understand the problem, design the solution, write Python code, execute the program, test the result, identify errors, and improve the program.`,

    keyPoints: `Python is a high-level programming language
Python source files normally use the .py extension
The Python interpreter executes Python statements
Python supports interactive and script execution
Programs should be tested and refined`,

    exampleTitle: "Example: First Python Program",

    exampleExplanation: `The simplest Python program can display a message using the print() function.`,

    codeExample: `print("Hello, Python!")`,

    expectedOutput: `Hello, Python!`,

    practiceQuestion: `Write a Python program that displays your name, branch, and college.`,

    practiceInstructions: `Use separate print() statements or suitable formatted output.`,

    practiceStarterCode: `print("Name:")
print("Branch:")
print("College:")`,

    importantNotes: `Python installation and execution tools may differ between operating systems.`,

    summary: `Python provides a readable environment for implementing algorithms and developing programs.`
  },


  "1.2.1": {
    introduction: `A Python execution environment provides the tools required to write, run, and test Python programs.`,

    learningObjectives: `Identify common ways of executing Python
Understand the role of the interpreter
Run a simple Python script
Distinguish interactive execution from script execution`,

    explanation: `Python can be executed using the command line, an integrated development environment, a code editor, or an online environment.

In interactive mode, Python statements can be entered directly and their results can be observed immediately.

In script mode, Python statements are stored in a file, normally with a .py extension. The file can then be executed by the Python interpreter.

Development environments may provide syntax highlighting, debugging, code completion, and project management.`,

    keyPoints: `Python can run interactively
Python programs can be stored in .py files
The interpreter executes Python source code
Editors and IDEs provide development features
Online environments can also be used`,

    exampleTitle: "Example: Running a Python File",

    exampleExplanation: `Create a file named hello.py containing a print statement and execute it using the Python interpreter.`,

    codeExample: `print("Python program is running.")`,

    expectedOutput: `Python program is running.`,

    practiceQuestion: `Create a Python file named first_program.py and execute it.`,

    practiceInstructions: `Display three lines of information about yourself.`,

    practiceStarterCode: `print("Name:")
print("Roll Number:")
print("Branch:")`,

    importantNotes: `The exact command used to start Python can differ between systems.`,

    summary: `A Python execution environment provides a place to write, execute, test, and debug programs.`
  },


  "1.2.2": {
    introduction: `Variables, identifiers, and keywords are fundamental elements used to write Python programs.`,

    learningObjectives: `Define a variable
Explain identifiers and naming rules
Identify Python keywords
Create and use variables`,

    explanation: `A variable is a name associated with a value used by a program.

An identifier is a name used to identify a variable, function, class, or other program element. Identifiers can contain letters, digits, and underscores, but cannot begin with a digit. Python identifiers are case-sensitive.

Keywords are reserved words that have special meaning in Python. Examples include if, else, for, while, def, class, return, True, False, and None.

Good identifiers should be meaningful and follow a consistent naming style.`,

    keyPoints: `Variables store or refer to values
Identifiers name program elements
Identifiers are case-sensitive
Identifiers cannot begin with a digit
Keywords have special meaning
Meaningful names improve readability`,

    exampleTitle: "Example: Variables and Identifiers",

    exampleExplanation: `The following program creates variables for a student's name and marks and displays them.`,

    codeExample: `student_name = "Ravi"
marks = 85

print("Student:", student_name)
print("Marks:", marks)`,

    expectedOutput: `Student: Ravi
Marks: 85`,

    practiceQuestion: `Create variables for student name, roll number, three subject marks, and average.`,

    practiceInstructions: `Use meaningful identifier names and display the values.`,

    practiceStarterCode: `student_name = ""
roll_number = ""
mark1 = 0
mark2 = 0
mark3 = 0

print(student_name)
print(roll_number)
print(mark1, mark2, mark3)`,

    importantNotes: `Python is case-sensitive. marks and Marks are different identifiers.`,

    summary: `Variables provide names for values, identifiers name program elements, and keywords are reserved by Python.`
  },


  "1.2.3": {
    introduction: `Python provides several built-in data types for representing different kinds of values. Type conversion allows values to be converted from one type to another when appropriate.`,

    learningObjectives: `Identify common Python data types
Use int, float, str, and bool
Explain type conversion
Convert user input into numeric types`,

    explanation: `Common built-in types include int for integers, float for decimal numbers, str for text, and bool for Boolean values.

The type() function can be used to inspect the type of a value.

Python also provides conversion functions such as int(), float(), str(), and bool().

The input() function returns text. If entered data needs to be used in arithmetic, it should normally be converted to int or float.`,

    keyPoints: `int represents integers
float represents decimal values
str represents text
bool represents True or False
type() identifies a type
int(), float(), str(), and bool() perform conversions when appropriate`,

    exampleTitle: "Example: Converting Input",

    exampleExplanation: `Convert two values entered by the user to integers before performing addition.`,

    codeExample: `a = int(input("Enter first number: "))
b = int(input("Enter second number: "))

total = a + b

print("Total:", total)`,

    expectedOutput: `Enter first number: 25
Enter second number: 15
Total: 40`,

    practiceQuestion: `Read the length and width of a rectangle and calculate its area.`,

    practiceInstructions: `Convert the inputs to numbers before multiplication.`,

    practiceStarterCode: `length = int(input("Enter length: "))
width = int(input("Enter width: "))

area = length * width

print("Area:", area)`,

    importantNotes: `Converting invalid text to int or float can produce an error.`,

    summary: `Python provides built-in data types for different kinds of values, and type conversion changes compatible representations when required.`
  },


  "1.2.4": {
    introduction: `Python provides input and output statements for interacting with users and displaying program results.`,

    learningObjectives: `Use print() for output
Use input() for user input
Understand that input() returns text
Convert input values when numeric processing is required
Format simple output clearly`,

    explanation: `The print() function displays information on the screen. It can display text, numbers, variables, and expressions.

The input() function reads a value entered by the user. The value returned by input() is a string, even when digits are entered.

Numeric input usually needs to be converted before arithmetic operations.

Clear prompts and output messages make programs easier to use.`,

    keyPoints: `print() displays output
input() reads user input
input() returns a string
int() and float() can convert numeric input
Clear prompts improve usability`,

    exampleTitle: "Example: Student Details",

    exampleExplanation: `The program asks the user for a name and marks and displays the information.`,

    codeExample: `name = input("Enter student name: ")
marks = int(input("Enter marks: "))

print("Student:", name)
print("Marks:", marks)`,

    expectedOutput: `Enter student name: Anil
Enter marks: 82
Student: Anil
Marks: 82`,

    practiceQuestion: `Write a program that accepts two numbers and displays their sum, difference, product, and quotient.`,

    practiceInstructions: `Use appropriate conversion functions and handle division by zero.`,

    practiceStarterCode: `a = float(input("Enter first number: "))
b = float(input("Enter second number: "))

print("Sum:", a + b)
print("Difference:", a - b)
print("Product:", a * b)

if b != 0:
    print("Quotient:", a / b)
else:
    print("Division by zero is not allowed.")`,

    importantNotes: `Always consider the type returned by input() before performing calculations.`,

    summary: `Input and output functions allow Python programs to communicate with users through the console.`
  },


  "1.2.5": {
    introduction: `Expressions combine values, variables, and operators to produce results. Python provides arithmetic, relational, logical, and assignment operators.`,

    learningObjectives: `Write arithmetic expressions
Use relational operators
Use logical operators
Use assignment operators
Evaluate simple Python expressions`,

    explanation: `Arithmetic operators include +, -, *, /, //, %, and **.

Relational operators compare values. Common operators include ==, !=, >, <, >=, and <=. Their result is normally a Boolean value.

Logical operators include and, or, and not. They combine or modify Boolean conditions.

The assignment operator = assigns a value. Python also provides augmented assignment operators such as +=, -=, *=, and /=.

Expressions may contain multiple operators. Operator precedence determines the order of evaluation.`,

    keyPoints: `Arithmetic operators perform calculations
Relational operators compare values
Logical operators combine conditions
Assignment operators update variables
Expressions produce values
Operator precedence determines evaluation order`,

    exampleTitle: "Example: Student Eligibility",

    exampleExplanation: `A student may be eligible when marks are at least 40 and attendance is at least 75. The two conditions can be combined using and.`,

    codeExample: `marks = 65
attendance = 82

eligible = marks >= 40 and attendance >= 75

print("Eligible:", eligible)`,

    expectedOutput: `Eligible: True`,

    practiceQuestion: `Write an expression to determine whether a number is between 10 and 50 inclusive.`,

    practiceInstructions: `Use relational and logical operators.`,

    practiceStarterCode: `number = int(input("Enter a number: "))

result = number >= 10 and number <= 50

print("Within range:", result)`,

    importantNotes: `Do not confuse =, which assigns a value, with ==, which compares two values.`,

    summary: `Operators allow Python programs to calculate values, compare data, combine conditions, and update variables.`
  },


  "1.2.6": {
    introduction: `Operator precedence determines the order in which parts of an expression are evaluated when an expression contains multiple operators.`,

    learningObjectives: `Explain operator precedence
Understand the role of parentheses
Evaluate simple expressions correctly
Use parentheses to make expressions clearer`,

    explanation: `When an expression contains multiple operators, Python follows precedence rules to determine which operation is performed first.

Parentheses can be used to explicitly control the order of evaluation and improve readability.

For example, 2 + 3 * 4 produces 14 because multiplication is performed before addition. However, (2 + 3) * 4 produces 20 because the parentheses cause addition to be performed first.

When an expression becomes difficult to understand, parentheses should be used to make the intended order explicit.`,

    keyPoints: `Operator precedence determines evaluation order
Parentheses can change the order
Multiplication and division are generally evaluated before addition and subtraction
Parentheses improve readability
Complex expressions should be written clearly`,

    exampleTitle: "Example: Precedence and Parentheses",

    exampleExplanation: `The two expressions below contain the same numbers but different grouping.`,

    codeExample: `a = 2 + 3 * 4
b = (2 + 3) * 4

print("Without parentheses:", a)
print("With parentheses:", b)`,

    expectedOutput: `Without parentheses: 14
With parentheses: 20`,

    practiceQuestion: `Evaluate 10 + 5 * 2 and (10 + 5) * 2.`,

    practiceInstructions: `First predict the answers and then execute the Python program to verify them.`,

    practiceStarterCode: `print(10 + 5 * 2)
print((10 + 5) * 2)`,

    importantNotes: `When an expression becomes difficult to read, use parentheses rather than relying only on memory of precedence rules.`,

    summary: `Operator precedence determines evaluation order, while parentheses provide explicit control and improve readability.`
  }

};


async function seedUnit1Content() {

  console.log("Starting Unit 1 lesson-content update...");

  let updated = 0;

  for (const [id, lesson] of Object.entries(lessons)) {

    const ref = db.collection("topics").doc(id);

    const snapshot = await ref.get();

    if (!snapshot.exists) {
      console.log(`SKIPPED: ${id} does not exist.`);
      continue;
    }

    await ref.set(
      {
        ...lesson,
        updatedAt:
          admin.firestore.FieldValue.serverTimestamp()
      },
      {
        merge: true
      }
    );

    console.log(
      `Updated: ${id} - ${snapshot.data().title}`
    );

    updated++;
  }

  console.log("");
  console.log(
    `DONE. ${updated} Unit 1 topics updated.`
  );
  console.log(
    "No topics were deleted or recreated."
  );
}


seedUnit1Content()
  .then(() => process.exit(0))
  .catch(error => {

    console.error(
      "UNIT 1 CONTENT ERROR:",
      error
    );

    process.exit(1);

  });
