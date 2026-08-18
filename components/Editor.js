'use client';
import dynamic from 'next/dynamic';
const Monaco=dynamic(()=>import('@monaco-editor/react'),{ssr:false});
export default function Editor({value,onChange,readOnly=false,height='280px'}){return <div className="editor"><Monaco height={height} language="python" theme="vs-dark" value={value||''} onChange={v=>onChange?.(v||'')} options={{fontSize:14,minimap:{enabled:false},automaticLayout:true,readOnly}}/></div>}
