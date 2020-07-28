import React from 'react';
import { IconContext } from "react-icons";
import {buttonsData} from './buttonsData';

function ControlButton(props) {
    return (
        <button className={`cntrlButton`} onClick={props.onClick}>
            <figure className="cntrlButtonFigure">
                <IconContext.Provider value={{ color: props.iconColor}}>
                    <div className={"cntrlButtonWrap " + props.className} >
                         {props.icon}
                    </div>
                </IconContext.Provider>
                <figcaption className="cntrlButtonLegend">{props.legend}</figcaption>
            </figure>
        </button>
    );
}

function RoomFooter(props) {
    const buttons = props.buttonsState.map((isOff, i) =>
        <ControlButton
            key={i}
            className={(isOff ? buttonsData[i].offClass : buttonsData[i].onClass)}
            legend={(isOff ? buttonsData[i].offLegend : buttonsData[i].onLegend)}
            icon={(isOff ? buttonsData[i].offIcon : buttonsData[i].onIcon)}
            iconColor={(isOff ? buttonsData[i].offIconColor : buttonsData[i].onIconColor)}
            onClick={() => props.onClick(i)}
            isOff={isOff}
        />
    );
    return (
        <div className="roomFooter">
            <div className="videoControlsContainer">
                <div className="videoControls">
                    <div className="buttonCenterWrapper">
                        <div className="buttonWrapper"> 
                            {buttons}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomFooter;