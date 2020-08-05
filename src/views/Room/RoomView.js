import '../../assets/scss/custom/room.scss';
import React, {useState} from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import {videoData, videoElement} from './videoData';
import RoomMainExpand from './RoomMainExpand';
import RoomMain from "./RoomMain";

function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the 
    const [buttonsState, setButtonsState] = useState([false, false, true, false, false]);
    const [videoElements, setVideoElements] = useState(videoData);
    const [isAnyVideoMax, setIsAnyVideoMax] = useState(false);

    const handleButtonClick = (i) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
    };

    const isMobile = () => {
        return window.innerWidth <= 700;
    };

    const setVideosLayout = (n) => {
        const cont = document.querySelector(':root');
        let perRow = Math.ceil(Math.sqrt(n));
        if (isMobile()) {
            if (n === 2)
                perRow = 1;
            else
                perRow = 2;
        }
        cont.style.setProperty('--per-row', perRow);
        const noOfRows = Math.ceil(n / perRow);
        cont.style.setProperty('--rows', noOfRows);
    };

    const addUser = () => {
        // generate some random key, para and title
        const userId = Math.random().toString(36).slice(2);
        const newVideoElement = new videoElement(null, false, userId, "crap");
        setVideosLayout(videoElements.size + 1);
        setVideoElements(new Map(videoElements.set(userId, newVideoElement)));
    };


    const handleMaximizeButtonClick = (userId) => {
        if (videoElements.has(userId) && videoElements.size > 1) {
            const newVideoElements = new Map(videoElements);
            newVideoElements.get(userId).isMax = !videoElements.get(userId).isMax;
            setIsAnyVideoMax(newVideoElements.get(userId).isMax);
            for (let [key] of newVideoElements.entries()) {
                if (key !== userId)
                    newVideoElements.get(key).isMax = false;
            }
            setVideoElements(newVideoElements);
        }
    };

    // const handleDeleteUser = (userId) => {
    //     if(videoElements.has(userId)) {
    //         if(videoElements.get(userId).isMax)
    //             setIsAnyVideoMax(false);
    //         setVideoElements(new Map(getDeletedMap(videoElements, userId)));
    //     }
    // };
    //
    // const getDeletedMap = (videoElements, userId) => {
    //     videoElements.delete(userId);
    //     return videoElements;
    // };

    return (
        <div className="room-main">
            <div className="video-container">
                {
                    isAnyVideoMax ?
                        <RoomMainExpand videoElements={videoElements}
                                        onMaximizeClick={(userId) => handleMaximizeButtonClick(userId)}/> :
                        <RoomMain videoElements={videoElements}
                                  onMaximizeClick={(userId) => handleMaximizeButtonClick(userId)}/>
                }
            </div>
            <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
            <RoomFooter buttonsState={buttonsState} onClick={(i) => handleButtonClick(i)}/>
        </div>
    );
}

export default RoomView;