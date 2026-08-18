let pyodidePromise;
async function getPyodide(){if(!pyodidePromise){importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js');pyodidePromise=loadPyodide();}return pyodidePromise;}
self.onmessage=async e=>{const {code}=e.data;try{const py=await getPyodide();let out='';py.setStdout({batched:s=>{out+=s}});py.setStderr({batched:s=>{out+=s}});await py.runPythonAsync(code);self.postMessage({ok:true,output:out});}catch(err){self.postMessage({ok:false,output:String(err)});}};
