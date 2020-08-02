import React from 'react';
import { IconContext } from "react-icons";
import {buttonsData} from './buttonsData';
import ReactTooltip from "react-tooltip";
import {FiChevronUp} from "react-icons/fi";

function ControlButton(props) {
    return (
        <>
            <ReactTooltip id={props.legend} place="top" type="dark" effect="solid" className="tooltip">
                <span>
                    {props.legend}
                </span>
            </ReactTooltip>
            <button className={"cntrlButton"} onClick={props.onClick} data-for={props.legend} data-tip>
                <figure className="cntrlButtonFigure">
                    <IconContext.Provider value={{ color: props.iconColor}}>
                        <div className={"cntrlButtonWrap " + props.className} >
                            {props.icon}
                        </div>
                    </IconContext.Provider>
                    {/* <figcaption className="cntrlButtonLegend">{props.legend}</figcaption> */}
                </figure>
            </button>
        </>
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
            <IconContext.Provider value={{ color: 'black'}}>
                <FiChevronUp className="button-hover"/>
            </IconContext.Provider>
            <div className="buttonWrapper"> 
                {buttons}
            </div>
        </div>
    );
}

export default RoomFooter;