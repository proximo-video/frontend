import '../../assets/scss/custom/room.scss';
import React, { useState } from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import RoomMain from './RoomMain';
import {videoData, videoElement} from './videoData';

function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the 
    const [buttonsState, setButtonsState] = useState([false, false, true, false, false]);
    const [videoElements, setVideoElements] = useState(videoData);

    const handleButtonClick = (i) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
    }

    // const isMobile = () => {
    //     return window.innerWidth <= 700;
    // }

    const setVideosLayout = (n) => {
        const cont = document.querySelector(':root');
        let perRow = Math.ceil(Math.sqrt(n));
        // if (isMobile())
        //     perRow = 2;
        console.log("Perrow: ", perRow);
        cont.style.setProperty('--per-row', perRow);
        const noOfRows = Math.ceil(n/perRow);
        cont.style.setProperty('--rows', noOfRows);
    }

    const addUser = () => {
        // generate some random key, para and title
        const userId = Math.random().toString(36).slice(2);
        const newVideoElement = new videoElement(null, false, userId, "crap");
        setVideosLayout(videoElements.size + 1);
        setVideoElements(new Map(videoElements.set(userId, newVideoElement)));
    }

    return (
        <div className="room-main">
            <div className="video-container">
                <RoomMain videoElements={videoElements}/>
            </div>
            <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
            <RoomFooter buttonsState={buttonsState} onClick={(i) => handleButtonClick(i)}/>
        </div>
    );
}

export default RoomView;