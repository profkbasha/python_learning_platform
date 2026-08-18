from fastapi import FastAPI,UploadFile,File,HTTPException
from pathlib import Path
import subprocess, tempfile, shutil, os
app=FastAPI(title='PPT Converter')
@app.get('/health')
def health(): return {'ok':True}
@app.post('/convert')
async def convert(file:UploadFile=File(...)):
    if not file.filename.lower().endswith('.pptx'): raise HTTPException(400,'Only PPTX is supported')
    work=Path(tempfile.mkdtemp()); src=work/file.filename; src.write_bytes(await file.read()); out=work/'out'; out.mkdir()
    try:
        subprocess.run(['libreoffice','--headless','--convert-to','pdf','--outdir',str(out),str(src)],check=True,timeout=120)
        pdf=next(out.glob('*.pdf'))
        # Convert PDF pages to PNG with LibreOffice is not available; return PDF for a second image/PDF processing stage.
        return {'pdf_file':str(pdf),'note':'Upload returned PDF to Firebase Storage; generate slide images with a PDF renderer if desired.'}
    finally: shutil.rmtree(work,ignore_errors=True)
