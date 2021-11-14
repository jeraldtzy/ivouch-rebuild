import React, {useMemo} from 'react';
import { post, get } from "axios";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import DragnDrop from './DragnDrop';



class PdfToExcelAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      rows: null,
      cols: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

      

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response);

      // creating new file
      var blob = new Blob([response.data]);
      const theFile = new File([blob], "foo.xlsx");
      console.log(theFile);

      //just pass the fileObj as parameter
      ExcelRenderer(theFile, (err, resp) => {
        if (err) {
          console.log(err);
        } else {
          console.log("setting excel data", resp.rows, resp.cols);
          this.setState(function (state, props) { // use the function form so that we don't clobber state.file
            return {
              file: state.file,
              cols: resp.cols,
              rows: resp.rows
            };
          });
        }
      });
    });
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fileUpload(file) {
    const url = 'https://pdftables.com/api?key=YOUR_API_KEY&format=xlsx-single';
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Accept: "application/vnd.ms-excel"
      },
      responseType: "blob" // this is crucial in correctly encoding/parsing the file data response as a blob
    };
    return post(url, formData, config);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        {/* <h1>File Upload</h1> */}
        <input type="file" onChange={this.onChange} />
        {/* <DragnDrop type="file" onChange={this.onChange}/> */}
        <button type="submit">Upload</button>

        {/* dropzone upload container */}
        

        <div className="ExcelPreview">
          { /* you forgot to include this[.state].file, also changed to .rows so it only displays after file is retrieved from API and parsed */ }
          {this.state.rows && ( //console.log(file), //file is col and row
            <OutTable
              data={this.state.rows}
              columns={this.state.cols}
              tableClassName="table"
              tableHeaderRowClass="heading"
            />
          )}
        </div>
      </form>
    );
  }
}

export default PdfToExcelAPI;
