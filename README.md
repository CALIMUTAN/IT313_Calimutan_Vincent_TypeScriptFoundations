# IT313 Laboratory 3: TypeScript Foundations

# Project Description

The Enrollment Eligibility Checker is a TypeScript program based on my Laboratory 2 JavaScript project. It calculates the average grades of five students and determines whether they are passing or on probation.

Students with an average of 75 or higher are passing. Students below 75 are on probation and receive the remark "Needs consultation."

# Files

**main.ts – Contains the student data and generates the report.

gradeUtils.ts – Contains the functions for calculating averages and checking status.

tsconfig.json – Contains the TypeScript configuration.

README.md – Explains the project.
**

# TypeScript Features Used

**Basic types: Specify the types of variables and function parameters.

Interfaces: Define the structure of students and reports.

Enum: Represents Passing and Probation statuses.

Optional property: Adds remarks only for students on probation.

Union type: Allows a batch ID to be a string or number.

Generics: Uses groupBy() to group students by status.

Async/await and try/catch: Simulate retrieving student data and handle errors.

Map and reduce: Generate the report and calculate the class average.

Modules: Import and export functions between files.**

# How to Run

Install the dependencies:
```console

npm install
npm install --save-dev typescript
npm install --save-dev tsx
npx tsc --init
```

Check for TypeScript errors:

```console
npx tsc --noEmit

Run the program:

npx tsx main.ts
```

# Expected Output

=== IT313 Enrollment Eligibility Report (TypeScript) ===
Ana Cruz - Average: 87.67 - PASSING
Bea Santos - Average: 65.00 - PROBATION - Needs consultation
Cid Ramos - Average: 94.67 - PASSING
Dex Alonzo - Average: 55.00 - PROBATION - Needs consultation
Eli Tan - Average: 78.00 - PASSING
Class Average: 76.07
Passing: 3 / 5