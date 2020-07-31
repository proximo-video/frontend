import React from 'react';
import '../../assets/scss/custom/room.scss'
import {classes} from './videoData'
import {FiMaximize, FiMinimize} from 'react-icons/fi';

function WebRTCMediaCell(props) {
  return (
      <div 
      className={
        "column" + (props.isAnyVideoMax ? classes[props.classIndx].fullMobileSize : classes[props.classIndx].mobileSize) + classes[props.classIndx].tabletSize + classes[props.classIndx].desktopSize
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
            <iframe className="has-ratio" width="640" height="360" src="https://www.youtube.com/embed/YE7VzlLtp-4?showinfo=0" frameBorder="0" allowFullScreen></iframe>
          </figure>
        </div>
      </div>
  );
}

// function WebRTCMediaCellGroup(props) {
//   let maxWebRTCMedia = null;
//   const normalWebRTCMedia = [];
//   const isFullScreenIndx = (props.isAnyVideoMax ? -1 : 0);
//   const classIndx = (props.videoElements.size>4 ? 5 : props.videoElements.size) + isFullScreenIndx;
//   for (let [key, value] of  props.videoElements.entries()) {
//     if(value.isMax) {
//       maxWebRTCMedia = <WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onDeleteClick={() => props.onDeleteClick(key)} title={value.title} para={value.para} maximizeIcon={<FiMinimize/>}
//         classIndx={0} isAnyVideoMax={props.isAnyVideoMax}
//       />;
//     }
//     else {
//       normalWebRTCMedia.push(<WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)} onDeleteClick={() => props.onDeleteClick(key)} title={value.title} para={value.para} maximizeIcon={<FiMaximize/>}
//         classIndx={classIndx} isAnyVideoMax={props.isAnyVideoMax}
//       />);
//     }
//   }
//   console.log("length: ", normalWebRTCMedia.length);
//   return (
//     <div className="columns is-multiline is-centered">
//       {maxWebRTCMedia}
//       <div className={"column sideContent is-two-thirds-desktop" + (normalWebRTCMedia.length===0 ? " is-hidden" : "")}>
//         <div className="columns is-mobile is-multiline is-centered">
//           {normalWebRTCMedia}
//         </div>
//       </div>
//     </div>
//   );
// }

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
        <div className={"column sideContent is-two-thirds-desktop" + (normalWebRTCMedia.length===0 ? " is-hidden" : "")}>
            <div className="columns is-mobile is-multiline is-centered">
            {normalWebRTCMedia}
            </div>
        </div>
        </div>
    );
//   const [videoElements, setVideoElements] = useState(videoData);
//   const [isAnyVideoMax, setIsAnyVideoMax] = useState(false);

//   const addUser = () => {
//     // generate some random key, para and title
//     const userId = Math.random().toString(36).slice(2);
//     const para = lorem.generateParagraphs(1);
//     const title = lorem.generateWords(1);
//     const newVideoElement = new videoElement(null, false, userId, title, para);
//     setVideoElements(new Map(videoElements.set(userId, newVideoElement)));
//   }

//   const handleMaxButtonClick = (userId) => {
//     const newVideoElements = new Map(videoElements);
//     newVideoElements.get(userId).isMax = !videoElements.get(userId).isMax; 
//     setIsAnyVideoMax(newVideoElements.get(userId).isMax);
//     for (let [key] of  newVideoElements.entries()) {
//       if(key !== userId)
//         newVideoElements.get(key).isMax = false;
//     }
//     setVideoElements(newVideoElements);
//   }

//   const handleDeleteUser = (userId) => {
//     if(videoElements.has(userId)) {
//       if(videoElements.get(userId).isMax)
//         setIsAnyVideoMax(false);
//       setVideoElements(new Map(getDeletedMap(videoElements, userId)));
//     }
//   }

//   const getDeletedMap = (videoElements, userId) => {
//     videoElements.delete(userId);
//     return videoElements;
//   }

//   return (
//     <div className="VideoStage">
//       <div className="VideoStageLayout">
//             <WebRTCMediaCellGroup 
//               videoElements={videoElements}
//               isAnyVideoMax={isAnyVideoMax}
//               onMaximizeClick={(userId) => handleMaxButtonClick(userId)}
//               onDeleteClick={(userId) => handleDeleteUser(userId)}
//             />
//         <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
//       </div>
//     </div>
//   );
}