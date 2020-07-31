import '../../assets/scss/custom/room.scss'
import React, { useState } from 'react';
import { LoremIpsum } from "lorem-ipsum";
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import RoomMain from './RoomMain';
import {videoData, videoElement} from './videoData';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the 
    const [buttonsState, setButtonsState] = useState([false, false, true, false, false]);
    const [videoElements, setVideoElements] = useState(videoData);
    const [isAnyVideoMax, setIsAnyVideoMax] = useState(false);
    const handleButtonClick = (i) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
    }

    const addUser = () => {
        // generate some random key, para and title
        const userId = Math.random().toString(36).slice(2);
        // const para = lorem.generateParagraphs(1);
        const title = lorem.generateWords(1);
        const newVideoElement = new videoElement(null, false, userId, title);
        setVideoElements(new Map(videoElements.set(userId, newVideoElement)));
    }

    const handleMaxButtonClick = (userId) => {
        const newVideoElements = new Map(videoElements);
        newVideoElements.get(userId).isMax = !videoElements.get(userId).isMax; 
        setIsAnyVideoMax(newVideoElements.get(userId).isMax);
        for (let [key] of  newVideoElements.entries()) {
        if(key !== userId)
            newVideoElements.get(key).isMax = false;
        }
        setVideoElements(newVideoElements);
    }

    const handleDeleteUser = (userId) => {
        if(videoElements.has(userId)) {
        if(videoElements.get(userId).isMax)
            setIsAnyVideoMax(false);
        setVideoElements(new Map(getDeletedMap(videoElements, userId)));
        }
    }

    const getDeletedMap = (videoElements, userId) => {
        videoElements.delete(userId);
        return videoElements;
    }

    return (
        <div className="VideoStage">
            <RoomMain 
              videoElements={videoElements}
              isAnyVideoMax={isAnyVideoMax}
              onMaximizeClick={(userId) => handleMaxButtonClick(userId)}
              onDeleteClick={(userId) => handleDeleteUser(userId)}
            />
            <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
            <RoomFooter buttonsState={buttonsState} onClick={(i) => handleButtonClick(i)}/>
      </div>
    );
}

export default RoomView;