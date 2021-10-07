import React, {useMemo, useState} from 'react';
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import {useDropzone} from 'react-dropzone';
import { OutTable, ExcelRenderer } from "react-excel-renderer";
// import pdf2excel, {genXlsx} from "pdf-to-excel"
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {genXlsx} from "."
import "pdf-to-excel"
// import useScript from './useScript';












const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: 100,

};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function PdfToExcelPreview(props) {
  // useScript("https://cdn.jsdelivr.net/npm/pdfjs-dist@2.6.347/build/pdf.min.js")
  // useScript("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.5/xlsx.full.min.js")
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: "image/*, .pdf, .xlsx",
    onDrop: files => console.log(files)
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const file = acceptedFiles[0];
  // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  
  

  // const pdf2excel = require('pdf-to-excel');

try {
  const options = {
    // when current pdf page number changes call this function(optional)
    // onProcess: (e) => console.warn(${e.numPage} / ${e.numPages}),
    // pdf start page number you want to convert (optional, default 1)
    start: 1,
    // pdf end page number you want to convert (optional, default )
    end: 2,
  }

  // pdf2excel.genXlsx(file, 'bar2.xlsx', options);
  genXlsx(file, 'bar2.xlsx', options);
} catch (err) {
  console.error(err);
}

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
        <br/>
        <h4>Files</h4>
        {/* <ul>{files}</ul> */}
    </div>
  );
}

export default PdfToExcelPreview