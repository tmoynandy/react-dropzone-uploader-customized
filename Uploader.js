import React, { useState, useEffect, useCallback } from 'react';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import PreviewComponent from './PreviewComponent'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'

const Uploader = () => {

  const Preview = ({ meta, fileWithMeta }, event, allFiles) => {
    console.log({fileWithMeta})
    const { name, percent, status, id, uploadedDate } = meta
    return (
      <div className={status === 'done' ? "preview" : "preview-x"}>
        <PreviewComponent
          name={name}
          percent={Math.round(percent)}
          status={status}
          id={id}
          uploadedDate={uploadedDate}
          fileWithMeta={fileWithMeta}
        />
      </div>
    )
  }

  const Layout = ({ input, previews, submitButton, dropzoneProps, status, files, extra: { maxFiles } }) => {
   
    const previewDone = [];
    const previewNotDone = [];

    if (previews.length > 0) {
      previews.map((preview, index) => {
        
        if (preview.props.meta.status === "done") {
          previewDone.push(preview)
        }
        else {
          previewNotDone.push(preview)
        }
      })
    };

    return (
      <div>

        {previews.length > 0 ?
          <div>{previewDone}</div> : null
        }
        &nbsp;&nbsp;&nbsp;
        <div {...dropzoneProps}>
          {files.length < maxFiles && input}
        </div>

        &nbsp;&nbsp;&nbsp;
        {previews.length > 0 ?
          <div>{previewNotDone}</div> : null
        }
      </div>
    )
  }

  const Input = ({ accept, onFiles, files, getFilesFromEvent, extra }) => {
    const isRejected = extra.reject;
    if(extra.reject){
      console.log({extra})
    }
    return (

      <label style={{ cursor: 'pointer', padding: 15, borderRadius: 3, justify: "center", }}>
        {
          isRejected?
            <div className='container'>
              <div>
                <h3>Only PDF Accepted</h3>
              </div>
            </div>
            :
            <div className='container'>
              <div>
                <h3>Drag and drop your attachments</h3>
                <p>or</p>
              </div>
              <br/>
              <label className='rounded' for="upload">Add Attachment</label>
            </div>
        }
        <input
          style={{ display: 'none' }}
          type="file"
          id="upload"
          accept={accept}
          multiple
          onChange={e => {
            getFilesFromEvent(e).then(chosenFiles => {
              onFiles(chosenFiles)
            })
          }}
        />


      </label>
    )
  }

  const getFilesFromEvent = e => {
    return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
        resolve(chosenFiles.map(f => f.fileObject))
      })
    })
  }

  // specify upload params and url for your files
  const getUploadParams = ({ file, meta }) => {
    const body = new FormData()
    body.append("mFile", file)
    body.append("alchemyToken", "someRandomToken");
    return { url: 'https://httpbin.org/post', body, }
  }

// RESPONSE FROM GENEVA WILL COME HERE
  const handleChangeStatus = ({ meta, xhr, remove, cancel, restart, fileWithMeta }, status, event) => {
    console.log(event.length);
    if (status === 'done'){
            let response = JSON.parse(xhr.response);
    } 
    console.log({response})
  };

  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <React.Fragment>
      <Dropzone
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        PreviewComponent={Preview}
        LayoutComponent={Layout}
        InputComponent={Input}
        accept=".pdf"
        onChangeStatus={handleChangeStatus}
        getFilesFromEvent={getFilesFromEvent}
        disabled={files => files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status))}
      />
      

      <div style={{ float: "right" }}>
        <button className='rounded-button-secondary' style={{ display: "inline-block" }}>Cancel</button>&nbsp;
        <button className='rounded-button-primary' style={{ display: "inline-block" }}>Save</button>
      </div>

    </React.Fragment>
  )
}

export default Uploader