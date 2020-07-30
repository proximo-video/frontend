import '../../assets/scss/custom/room.scss'
import React, { useState } from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';


function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the 
    const [buttonsState, setButtonsState] = useState([false, false, true, false, false]);
    const handleButtonClick = (i) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
    }
    return <RoomFooter buttonsState={buttonsState} onClick={(i) => handleButtonClick(i)}/>
}

export default RoomView;