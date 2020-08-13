import React, { ReactElement, useState } from 'react';
import { IconContext } from "react-icons";
import { buttonsData } from './buttonsDataType';
import ReactTooltip from "react-tooltip";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { toggleAudio, toggleVideo, getUserMedia, sendMessage, getUserScreen } from '../../redux/actions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { detect } from 'detect-browser';
import { useHistory } from "react-router-dom";

export interface ControlButtonProps {
    legend: string;
    onClick: () => void;
    iconColor: string;
    disabled?: boolean;
    className?: string;
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
            <button className={"cntrlButton"} disabled={props.disabled}  onClick={props.onClick} data-for={props.legend} data-tip>
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
    // buttonsState: boolean[];
    // onClick: (i: number) => void;
    chatButtonState: boolean;
    onChatButtonClick: () => void;

}

function RoomFooter(props: RoomFooterProps) {
    const [isPinned, setIsPinned] = useState(true);
    const isAudio = useSelector((state: RootStateOrAny) => state.userMediaPreference.isAudio);
    const isVideo = useSelector((state: RootStateOrAny) => state.userMediaPreference.isVideo);
    const id = useSelector((state: RootStateOrAny) => state.id);
    const userScreen = useSelector((state: RootStateOrAny) => state.userScreen);
    const history = useHistory()
    const handlePinButtonClick = () => {
        setIsPinned(!isPinned);
    }
    const browser = detect();
    const dispatch = useDispatch();

    const onCamButtonClick = () => {
        dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: isAudio, isVideo: !isVideo } }))
        dispatch(toggleVideo());
        if (!(browser && browser.name === 'firefox') && !isVideo)
            dispatch(getUserMedia(false));
    }
    const onMicButtonClick = () => {
        dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: !isAudio, isVideo: isVideo } }))
        dispatch(toggleAudio());
    }
    const onScreenButtonClick = () => {
        dispatch(getUserScreen(!userScreen));
    }
    const onLeaveButtonClick = () => {
        dispatch(sendMessage({id:id,action:'LEAVEROOM',message:''}));
        history.push('/')
    }

    // const buttons = props.buttonsState.map((isOff: boolean, i: number) =>
    //     <ControlButton
    //         key={i}
    //         className={(isOff ? buttonsData[i].offClass : buttonsData[i].onClass)}
    //         legend={(isOff ? buttonsData[i].offLegend : buttonsData[i].onLegend)}
    //         icon={(isOff ? buttonsData[i].offIcon : buttonsData[i].onIcon)}
    //         iconColor={(isOff ? buttonsData[i].offIconColor : buttonsData[i].onIconColor)}
    //         onClick={() => props.onClick(i)}
    //         // isOff={isOff}
    //     />
    // );
    return (
        <div className="room-footer">
            <ReactTooltip id="pin-toolbar" place="right" type="dark" effect="float" className="tooltip" />
            <button className={"cntrlButton" + (isPinned ? " pinned" : " unpinned")} onClick={() => handlePinButtonClick()} data-for="pin-toolbar" data-tip={isPinned ? "unpin toolbar" : "pin toolbar"} id="pin-toolbar-button">
                {isPinned ? <FaChevronDown className="button-hover-down" /> : <FaChevronUp className="button-hover-up" />}
            </button>
            <div className="buttonWrapper">
                <ControlButton
                    className={(isVideo ? buttonsData[0].onClass : buttonsData[0].offClass)}
                    legend={(isVideo ? buttonsData[0].onLegend : buttonsData[0].offLegend)}
                    icon={(isVideo ? buttonsData[0].onIcon : buttonsData[0].offIcon)}
                    disabled={userScreen}
                    iconColor={(isVideo ? buttonsData[0].onIconColor : buttonsData[0].offIconColor)}
                    onClick={onCamButtonClick}
                />
                <ControlButton
                    className={(isAudio ? buttonsData[1].onClass : buttonsData[1].offClass)}
                    legend={(isAudio ? buttonsData[1].onLegend : buttonsData[1].offLegend)}
                    icon={(isAudio ? buttonsData[1].onIcon : buttonsData[1].offIcon)}
                    iconColor={(isAudio ? buttonsData[1].onIconColor : buttonsData[1].offIconColor)}
                    onClick={onMicButtonClick}
                />
                <ControlButton
                    className={(false ? buttonsData[2].onClass : buttonsData[2].offClass)}
                    legend={(false ? buttonsData[2].onLegend : buttonsData[2].offLegend)}
                    icon={(false ? buttonsData[2].onIcon : buttonsData[2].offIcon)}
                    iconColor={(false ? buttonsData[2].onIconColor : buttonsData[2].offIconColor)}
                    onClick={onScreenButtonClick}
                />
                <ControlButton
                    className={(props.chatButtonState ? buttonsData[3].onClass : buttonsData[3].offClass)}
                    legend={(props.chatButtonState ? buttonsData[3].onLegend : buttonsData[3].offLegend)}
                    icon={(props.chatButtonState ? buttonsData[3].onIcon : buttonsData[3].offIcon)}
                    iconColor={(props.chatButtonState ? buttonsData[3].onIconColor : buttonsData[3].offIconColor)}
                    onClick={props.onChatButtonClick}
                />
                <ControlButton
                    legend={buttonsData[4].onLegend}
                    icon={buttonsData[4].onIcon}
                    iconColor={buttonsData[4].onIconColor}
                    onClick={onLeaveButtonClick}
                />
                {/*{buttons}*/}
            </div>
        </div>
    );
}

export default RoomFooter;