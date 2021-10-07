import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { OutTable, ExcelRenderer } from "react-excel-renderer";



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
 
  function ExcelPreview(props) {
    const [file, setFile] = useState(null);
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
    
    
    acceptedFiles.map(f => ( //accepted files is array of file
      //just pass the fileObj as parameter
      ExcelRenderer(f, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          setFile({
            cols: resp.cols,
            rows: resp.rows
          });
        }
      })
    ));


    return (
      <div className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files EXCEL</p>
        </div>
        <div className="ExcelPreview">

          {file && ( //console.log(file), //file is col and row  
            <OutTable
              data={file.rows}
              columns={file.cols} 
              tableClassName="table"
              tableHeaderRowClass="heading"
            />
          )}
        </div>
          <br/>
          {/* <h4>Files</h4> */}
          {/* <ul>{files}</ul> */}

          
      </div>
    );
  }
  


export default ExcelPreview;