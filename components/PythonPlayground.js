'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Monaco = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

export default function PythonPlayground({
  initialCode = '',
  readOnly = false,
  onCodeChange,
  height = '320px',
}) {
  const workerRef = useRef(null);

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [pythonReady, setPythonReady] = useState(false);
  const [pythonError, setPythonError] = useState('');

  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/python.worker.js', import.meta.url)
    );

    workerRef.current = worker;

    worker.onmessage = (event) => {
      const data = event.data || {};

      if (data.type === 'status') {
        if (data.status === 'ready') {
          setPythonReady(true);
        }
      }

      if (data.type === 'result') {
        setOutput(data.output || 'Program finished with no output.');
        setRunning(false);
      }

      if (data.type === 'error') {
        setOutput(data.error || 'Python execution failed.');
        setPythonError('');
        setRunning(false);
      }
    };

    worker.onerror = (error) => {
      console.error('Python worker error:', error);

      setPythonError(
        error?.message ||
        'Unable to start Python runtime.'
      );

      setRunning(false);
    };

    return () => {
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  function handleCodeChange(value) {
    const nextCode = value || '';

    setCode(nextCode);
    onCodeChange?.(nextCode);
  }
  // Keep read-only/student editor synchronized with teacher code
  useEffect(() => {
    if (readOnly) {
      setCode(initialCode || '');
    }
  }, [initialCode, readOnly]);



  function runPython() {
    if (!workerRef.current) {
      setPythonError('Python runtime is not available.');
      return;
    }

    if (!code.trim()) {
      setOutput('Please enter Python code.');
      return;
    }

    setRunning(true);
    setOutput('');
    setPythonError('');

    workerRef.current.postMessage({
      type: 'run',
      code,
    });
  }

  function clearOutput() {
    setOutput('');
  }

  return (
    <section className="python-playground">

      <div className="python-playground-header">

        <div>
          <strong>
            🐍 Python Playground
          </strong>

          <small>
            {running
              ? 'Running Python...'
              : pythonReady
                ? 'Python ready'
                : 'Python runtime will load when Run is clicked'}
          </small>
        </div>

        <div className="python-playground-actions">

          <button
            type="button"
            onClick={runPython}
            disabled={running || readOnly}
          >
            {running
              ? '⏳ Running...'
              : '▶ Run Python'}
          </button>

          <button
            type="button"
            className="secondary"
            onClick={clearOutput}
          >
            Clear Output
          </button>

        </div>

      </div>

      {pythonError && (
        <div className="python-playground-error">
          {pythonError}
        </div>
      )}

      <div className="python-editor">

        <Monaco
          height={height}
          language="python"
          theme="vs-dark"
          value={code}
          onChange={handleCodeChange}
          options={{
            fontSize: 15,
            minimap: {
              enabled: false,
            },
            automaticLayout: true,
            readOnly,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />

      </div>

      <div className="python-output">

        <div className="python-output-title">
          OUTPUT
        </div>

        <pre>
          {output ||
            'Run the program to see the output.'}
        </pre>

      </div>

    </section>
  );
}
