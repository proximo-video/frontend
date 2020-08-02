import React from 'react';
import '../../assets/scss/custom/room.scss';
// import {classes} from './videoData';
// import {FiMaximize, FiMinimize} from 'react-icons/fi';

function WebRTCMediaCell() {
  return (
      <div className="video">
        <div className="inner">
          <iframe className="has-ratio" src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0" frameBorder="0" allowFullScreen></iframe>
      </div>
      </div>
  );
}

export default function RoomMain(props) {
    const normalWebRTCMedia = [];
    for (let key of  props.videoElements.keys()) {
        normalWebRTCMedia.push(<WebRTCMediaCell key={key}/>);
    }
    return (
        <>
          {normalWebRTCMedia}
        </>
    );
}