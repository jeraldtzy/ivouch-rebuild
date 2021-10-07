import React, {Component}from 'react';
import DragnDrop from './components/DragnDrop';
import { makeStyles } from '@material-ui/core';
import ExcelPreview from './components/ExcelPreview'
import PdfPreview from './components/PdfPreview';
import PdfToExcelPreview from './components/PdfToExcelPreview';
import PdfToExcelAPI from './components/PdfToExcelAPI';




const NewProject = () => {

    return ( 
        
        <div>
            <h1>Upload Files</h1>
            <br/>
            <ExcelPreview />  
            <PdfPreview />
            {/* <PdfToExcelPreview /> */}
            <PdfToExcelAPI />
    
     
        </div>
     );
}
 
export default NewProject;