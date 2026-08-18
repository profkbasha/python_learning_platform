let pyodide = null;

async function loadPython() {

  if (pyodide) {
    return pyodide;
  }

  importScripts(
    "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js"
  );

  pyodide = await loadPyodide();

  return pyodide;
}


self.onmessage = async function (event) {

  const {
    code,
    input = ''
  } = event.data || {};

  try {

    if (!code || !code.trim()) {

      self.postMessage({
        output: 'Please enter Python code.'
      });

      return;
    }


    const python =
      await loadPython();


    // ================================================
    // INPUT
    // ================================================

    const inputLines =
      String(input)
        .replace(/\r\n/g, '\n')
        .split('\n');

    let inputIndex = 0;


    python.setStdin({

      stdin: () => {

        if (
          inputIndex >=
          inputLines.length
        ) {

          return null;

        }

        return inputLines[
          inputIndex++
        ];

      }

    });


    // ================================================
    // OUTPUT
    // ================================================

    let output = '';

    let errorOutput = '';


    python.setStdout({

      batched: (text) => {

        output += text;

      }

    });


    python.setStderr({

      batched: (text) => {

        errorOutput += text;

      }

    });


    // ================================================
    // RUN
    // ================================================

    await python.runPythonAsync(
      code
    );


    self.postMessage({

      output:
        errorOutput
          ? `${output}${errorOutput}`
          : output ||
            'Program executed successfully.'

    });


  } catch (error) {

    self.postMessage({

      output:
        'Python Error:\n' +
        (
          error?.message ||
          String(error)
        )

    });

  }

};
