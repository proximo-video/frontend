import React, {ReactElement, useState} from 'react';
import { IconContext } from "react-icons";
import { buttonsData } from './buttonsDataType';
import ReactTooltip from "react-tooltip";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export interface ControlButtonProps {
    legend: string;
    onClick: () => void;
    iconColor: string;
    className: string;
    icon: ReactElement;
}

function ControlButton(props: ControlButtonProps) {
    return (
        <>
            <ReactTooltip id={props.legend} place="top" type="dark" effect="solid" className="tooltip">
                <span>
                    {props.legend}
                </span>
            </ReactTooltip>
            <button className={"cntrlButton"} onClick={props.onClick} data-for={props.legend} data-tip>
                <figure className="cntrlButtonFigure">
                    <IconContext.Provider value={{ color: props.iconColor }}>
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

export interface RoomFooterProps {
    buttonsState: boolean[];
    onClick: (i: number) => void;
}

function RoomFooter(props: RoomFooterProps) {
    const [isPinned, setIsPinned] = useState(true);

    const handlePinButtonClick = () => {
        setIsPinned(!isPinned);
    }

    const buttons = props.buttonsState.map((isOff: boolean, i: number) =>
        <ControlButton
            key={i}
            className={(isOff ? buttonsData[i].offClass : buttonsData[i].onClass)}
            legend={(isOff ? buttonsData[i].offLegend : buttonsData[i].onLegend)}
            icon={(isOff ? buttonsData[i].offIcon : buttonsData[i].onIcon)}
            iconColor={(isOff ? buttonsData[i].offIconColor : buttonsData[i].onIconColor)}
            onClick={() => props.onClick(i)}
            // isOff={isOff}
        />
    );
    return (
        <div className="room-footer">
            <ReactTooltip id="pin-toolbar" place="right" type="dark" effect="float" className="tooltip" />
            <button className={"cntrlButton" + (isPinned ? " pinned" : " unpinned")} onClick={() => handlePinButtonClick()} data-for="pin-toolbar" data-tip={isPinned ? "unpin toolbar" : "pin toolbar"} id="pin-toolbar-button">
                {isPinned ? <FaChevronDown className="button-hover-down" /> : <FaChevronUp className="button-hover-up" />}
            </button>
            <div className="buttonWrapper">
                {buttons}
            </div>
        </div>
    );
}

export default RoomFooter;