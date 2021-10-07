import React, {useMemo} from 'react';
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import {useDropzone} from 'react-dropzone';


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

export default function PdfPreview() {

    // dropzone
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
      acceptedFiles,
    } = useDropzone({
      accept: ".pdf, .xlsx",
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


  // pdf preview  
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [url, setUrl] = React.useState("");

  const onChange = (e) => {
    const files = e.target.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };


  return (
    <div>
      {/* dropzone upload container */}
      <div onChange={onChange} {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files PDF</p>
        </div>
        <br/>

      {/* pdf preview */}
      <div style={{ height: "550px" }}>
        {url ? (
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "50%",
              width: "75%",
            }}
          >
            <Viewer fileUrl={url} />
          </div>
        ) : (
          <div
            style={{
              alignItems: "center",
              border: "2px dashed rgba(0, 0, 0, .3)",
              display: "flex",
              fontSize: "2rem",
              height: "50%",
              justifyContent: "center",
              width: "75%",
            }}
          >
            Preview area
          </div>
        )}
      </div>
    </div>
  );
}
