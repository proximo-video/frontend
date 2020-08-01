import React from 'react';
import '../../assets/scss/custom/room.scss';
import {classes} from './videoData';
import {FiMaximize, FiMinimize} from 'react-icons/fi';

function WebRTCMediaCell(props) {
  return (
      <div 
      className={
        "column" + (props.isAnyVideoMax ? classes[props.classIndx].fullMobileSize : classes[props.classIndx].mobileSize + " h-50") + classes[props.classIndx].tabletSize + classes[props.classIndx].desktopSize
      }
      >
        <div className="box">
          <div className="message-header">
            {props.title}
            <div className="buttons">
              <span className="icon maximize" onClick={props.onMaximizeClick}>
                {props.maximizeIcon}
              </span>
              <button className="delete" onClick={props.onDeleteClick}></button>
            </div>
          </div>
          <figure className="image is-16by9">
          {/* <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png"/> */}
          {/* <span className="is-rounded" >
          OH
          </span> */}
          
            <iframe className="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0" frameBorder="0" allowFullScreen></iframe>
          </figure>
        </div>
      </div>
  );
}

export default function RoomMain(props) {
    let maxWebRTCMedia = null;
    const normalWebRTCMedia = [];
    const isFullScreenIndx = (props.isAnyVideoMax ? -1 : 0);
    const classIndx = (props.videoElements.size>4 ? 5 : props.videoElements.size) + isFullScreenIndx;
    for (let [key, value] of  props.videoElements.entries()) {
        if(value.isMax) {
        maxWebRTCMedia = <WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onDeleteClick={() => props.onDeleteClick(key)} title={value.title} para={value.para} maximizeIcon={<FiMinimize/>}
            classIndx={0} isAnyVideoMax={props.isAnyVideoMax}
        />;
        }
        else {
        normalWebRTCMedia.push(<WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onDeleteClick={() => props.onDeleteClick(key)} title={value.title} para={value.para} maximizeIcon={<FiMaximize/>}
            classIndx={classIndx} isAnyVideoMax={props.isAnyVideoMax}
        />);
        }
    }
    // console.log("length: ", normalWebRTCMedia.length);
    return (
        <div className="columns is-multiline is-centered">
        {maxWebRTCMedia}
        <div className={"column" + (normalWebRTCMedia.length===0 ? " is-hidden" : "") + (!maxWebRTCMedia ? " is-two-thirds-desktop" : " sideContent")}>
            <div className="columns is-mobile is-multiline is-centered">
            {normalWebRTCMedia}
            </div>
        </div>
        </div>
    );
}