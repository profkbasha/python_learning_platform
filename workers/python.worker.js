let pyodide = null;

self.onmessage = async (event) => {
  const { type, code } = event.data || {};

  if (type !== 'run') return;

  try {
    if (!pyodide) {
      self.postMessage({
        type: 'status',
        status: 'loading',
      });

      importScripts(
        'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js'
      );

      pyodide = await loadPyodide({
        indexURL:
          'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/',
      });

      self.postMessage({
        type: 'status',
        status: 'ready',
      });
    }

    let output = '';

    pyodide.setStdout({
      batched: (text) => {
        output += `${text}\n`;
      },
    });

    pyodide.setStderr({
      batched: (text) => {
        output += `${text}\n`;
      },
    });

    await pyodide.runPythonAsync(code);

    self.postMessage({
      type: 'result',
      output: output.trim(),
    });

  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error?.message || String(error),
    });
  }
};
