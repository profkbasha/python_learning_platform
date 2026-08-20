'use client';

import PythonPlayground from '../../components/PythonPlayground';

export default function PythonTestPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '40px',
        background: '#f4f7fb',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <h1>🐍 Python Playground Test</h1>

        <p>
          This is a temporary test page for the live Python
          execution engine.
        </p>

        <PythonPlayground
          initialCode={`# Python Live Test

name = "Python Learning"
print("Hello from", name)

a = 10
b = 20

print("Sum =", a + b)
`}
        />
      </div>
    </main>
  );
}
