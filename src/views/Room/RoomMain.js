import React from 'react';
import '../../assets/scss/custom/room.scss';

function WebRTCMediaCell() {
  return (
      <div className="video">
        <div className="inner">
          <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>
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