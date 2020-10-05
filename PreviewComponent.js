import React, { useState } from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

const PreviewComponent = (props) => {

  const [progressColor, setColor] = useState('#1ddc3b');
  const [toolTip, setToolTip] = useState("Tony Stark<br/><br/>Uploaded<br/>"+moment(props.uploadedDate).format('MMM DD YYYY h:mm a'));

  const removeUploaded = ()=>{
    props.fileWithMeta.remove();
  }

  const changeUploadState = () => {
    props.fileWithMeta.cancel();
    setColor('#DE071C')
    setTimeout(() => {
      props.fileWithMeta.remove();
    }, 2000)
  }

  return (
    <div style={{ width: "100%", }}>
      {props.status !== 'done' ?
        <div style={{ width: "100%" }}>
          <div style={{ align: "center", }}>

            <img style={{ width: "25px", height: "35px", display: "inline-block", verticalAlign: "middle" }} src='https://www.pngfind.com/pngs/m/520-5203556_file-or-document-icon-icons-png-certificate-of.png' />
            &nbsp;&nbsp;&nbsp;
            <div style={{ display: "inline-block", verticalAlign: "middle", color:'#8f8f8f' }}>{props.name}</div>

          </div>

          <div style={{ width: "80%", display: "inline-block" }}>

            <Progress
              width={7}
              percent={props.percent}
              status="success"
              theme={{ success: { symbol: '‍', color: progressColor } }}
            />

          </div>

          <div style={{ display: "inline-block" }}>
            <button className='attachment-icon-button' onClick={changeUploadState}><FontAwesomeIcon icon={faTimes} /></button>
          </div>

        </div>
        :
        <div style={{ color: "#298bff", display: "inline", width: '100%', marginLeft: '5px' }}>
          <FontAwesomeIcon
            data-for="main"
            data-tip={toolTip}
            data-iscapture="true"
            icon={faInfoCircle}
          />
          &nbsp;&nbsp;{props.name} &nbsp;
          <button onClick={removeUploaded} className='attachment-icon-button'><FontAwesomeIcon icon={faTimes} /></button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      }
      <ReactTooltip
        id="main"
        effect={"float"}
        multiline={true}
        className='customeTooltip'
      />
    </div>
  )
}

export default PreviewComponent