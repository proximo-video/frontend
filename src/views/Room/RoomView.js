import '../../assets/scss/custom/room.scss'
import React, { useState } from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import {buttonsData} from './buttonsData';


function RoomView() {
    const [buttons, setButtons] = useState([buttonsData[0].isOff, buttonsData[1].isOff, buttonsData[2].isOff, buttonsData[3].isOff, buttonsData[4].isOff]);
    function handleButtonClick(i) {
        const newButtons = buttons.slice();
        newButtons[i] = !buttons[i];
        setButtons(newButtons);
    }
    return <RoomFooter buttons={buttons} onClick={(i) => handleButtonClick(i)}/>
}

export default RoomView;