import React, { useState } from 'react';
import {FiVideoOff, FiVideo, FiMic, FiMicOff} from "react-icons/fi";
import { IconContext } from "react-icons";

function ControlButton(props) {
    return (
        <button className={`cntrlButton`} onClick={props.onClick}>
            <figure className="cntrlButtonFigure">
                <IconContext.Provider value={{ color: "white"}}>
                    <div className={"cntrlButtonWrap " + (props.isOff ? "isOff" : "")} >
                         {props.icon}
                    </div>
                </IconContext.Provider>
                <figcaption className="cntrlButtonLegend">{props.legend}</figcaption>
            </figure>
        </button>
    );
}

function RoomFooter() {
    const [camButton, setCamButton] = useState(true);
    const [micButton, setMicButton] = useState(false);
    
    function handleCamButtonClick() {
        setCamButton(!camButton);
    }
    
    function handleMicButtonClick() {
        setMicButton(!micButton);
    }

    return (
        <div className="roomFooter">
            <div className="videoControlsContainer">
                <div className="videoControls">
                    <div className="buttonCenterWrapper">
                        <div className="buttonWrapper"> 
                            <ControlButton 
                                className="toggle-video" 
                                legend="Cam" isOff={camButton} 
                                icon={(camButton ? <FiVideoOff /> : <FiVideo />)}
                                onClick={handleCamButtonClick}
                            />
                            <ControlButton 
                                className="toggle-mic" 
                                legend="Mic" isOff={micButton} 
                                icon={(micButton ? <FiMicOff /> : <FiMic />)}
                                onClick={handleMicButtonClick}
                            />
                            <ControlButton 
                                className="toggle-video" 
                                legend="Cam" isOff={camButton} 
                                icon={(camButton ? <FiVideoOff /> : <FiVideo />)}
                                onClick={handleCamButtonClick}
                            />
                            <ControlButton 
                                className="toggle-mic" 
                                legend="Mic" isOff={micButton} 
                                icon={(micButton ? <FiMicOff /> : <FiMic />)}
                                onClick={handleMicButtonClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomFooter;