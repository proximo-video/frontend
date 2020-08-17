import React, {ReactElement, useState} from 'react';
import { IconContext } from "react-icons";
import { buttonsData } from './buttonsDataType';
import ReactTooltip from "react-tooltip";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { toggleAudio, toggleVideo, getUserMedia, sendMessage, getUserScreen, meetingEnded, toggleCameraView } from '../../redux/actions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { detect } from 'detect-browser';
import { useHistory } from "react-router-dom";
import { DropdownContent } from "./Dropdown";
import DropdownOption from "./expandedRoomDataType";
import '../../assets/scss/custom/dropdown.scss';



export interface ControlButtonProps {
    legend: string;
    onClick: () => void;
    iconColor: string;
    disabled?: boolean;
    className?: string;
    icon: ReactElement;
    hide: boolean;
    onMouseOut?: () => void;
    children?: React.ReactNode;
}

function ControlButton(props: ControlButtonProps) {
    return (
        <>
            <ReactTooltip id={props.legend} place="top" type="dark" effect="solid" className="tooltip">
                <span>
                    {props.legend}
                </span>
            </ReactTooltip>
            <button onMouseLeave={props.onMouseOut ?? null} className={"cntrl-button " + props.className + (props.disabled ? ' disabled' : '')} style={props.hide ? { display: 'none' } : {}} disabled={props.disabled} onClick={props.onClick} data-for={props.legend} data-tip>
                <figure className="cntrl-button-figure">
                    <IconContext.Provider value={{ color: props.iconColor }}>
                        <div className={"cntrl-button-wrap"} >
                            {props.icon}
                        </div>
                    </IconContext.Provider>
                    {/* <figcaption className="cntrlButtonLegend">{props.legend}</figcaption> */}
                </figure>
                {props.children}
            </button>
        </>
    );
}

ControlButton.defaultProps = {
    hide: false,
    legend: ''
}

const browser = detect();

export const checkIsMobile = () => {
    return browser.os === 'Android OS' || browser.os === 'iOS' || browser.os === 'BlackBerry OS' || browser.os === 'Windows Mobile';
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
    const isRoomOwner = useSelector((state: RootStateOrAny) => state.isRoomOwner);
    const id = useSelector((state: RootStateOrAny) => state.id);
    const userScreen = useSelector((state: RootStateOrAny) => state.userScreen);
    const history = useHistory();
    const isMobile = checkIsMobile();
    // let timer: NodeJS.Timeout;
    // let timeVisible = 5000;
    // let buttonsElement: HTMLElement;
    // let pinButton: HTMLElement;
    const handlePinButtonClick = () => {
        // if (isPinned && pinButton) {
        //     if (buttonsElement)
        //         buttonsElement.style.bottom = '-65px';
        // }
        setIsPinned(!isPinned);
    }
    const dispatch = useDispatch();
    const [copyLinkLegend, setCopyLinkLegend] = useState<string>('Copy Link');

    const onCamButtonClick = () => {
        dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: isAudio, isVideo: !isVideo, isScreen: userScreen } }))
        dispatch(toggleVideo());
        if (!(browser && browser.name === 'firefox') && !isVideo)
            dispatch(getUserMedia(false));
    }
    const onMicButtonClick = () => {
        dispatch(sendMessage({ id: id, action: 'MEDIAPREFERENCE', message: { isAudio: !isAudio, isVideo: isVideo, isScreen: userScreen } }))
        dispatch(toggleAudio());
    }
    const onScreenButtonClick = () => {
        dispatch(getUserScreen(!userScreen));
    }
    const onLeaveButtonClick = () => {
        dispatch(sendMessage({ id: id, action: 'LEAVEROOM', message: '' }));
        history.push('/')
    }

    const onEndMeetingButtonClick = () => {
        dispatch(sendMessage({id:id,action:'ENDMEETING'}));
        dispatch(meetingEnded());
        console.log("End meeting:");
    }

    const onToggleCamButtonClick = () => {
        dispatch(toggleCameraView());
        dispatch(getUserMedia(false));
    }

    const copyLinkToClipBoard = async () => {
        const linkToCopy = window.location.href;
        await navigator.clipboard.writeText(linkToCopy);
        setCopyLinkLegend('Link Copied');
    }

    const onMouseOutCopyButton = () => {
        setCopyLinkLegend('Copy Link');
    }

    const handleShareButtonClick = async () => {
        const linkToShare = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'Proximo',
                text: 'Join meeting',
                url: linkToShare,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else
            await copyLinkToClipBoard();
    }

    const maxOptionsMenu = [
        new DropdownOption(null, 'End Meeting for all', onEndMeetingButtonClick),
        new DropdownOption(null, 'Leave meeting',onLeaveButtonClick),
    ];

    // const timeFadeout = () => {
    //     timer = setTimeout(function() {
    //         if(buttonsElement && !isPinned) {
    //             buttonsElement.style.bottom = '-65px';
    //         }
    //     }, timeVisible );
    // }
    //
    // const handleDocumentClickEvent = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     if(!isPinned && buttonsElement) {
    //         clearTimeout(timer);
    //         console.log('clicked');
    //         if (buttonsElement.style.bottom === '25px')
    //             buttonsElement.style.bottom = '-65px';
    //         else {
    //             buttonsElement.style.bottom = '25px';
    //             timeFadeout();
    //         }
    //     }
    // }

    // useEffect(() => {
    //     buttonsElement = document.getElementById('buttons');
    //     pinButton = document.getElementById('pin-toolbar-button');
    //     if (isMobile) {
    //         timeFadeout();
    //         document.addEventListener('click', handleDocumentClickEvent);
    //     }
    //     return () => {
    //         if (isMobile)
    //             document.removeEventListener('click', handleDocumentClickEvent);
    //     }
    // }, []);

    return (
        <div className="room-footer" id={"buttons-footer"}>
            <ReactTooltip id="pin-toolbar" place="right" type="dark" effect="float" className="tooltip" />
            <button className={"cntrl-button" + (isPinned ? " pinned" : " unpinned")} onClick={() => handlePinButtonClick() } data-for="pin-toolbar" data-tip={isPinned ? "unpin toolbar" : "pin toolbar"} id="pin-toolbar-button">
                {isPinned ? <FaChevronDown className="button-hover-down" /> : <FaChevronUp className="button-hover-up" />}
            </button>
            <div className="buttonWrapper" id={"buttons"}>
                {/*cam button*/}
                <ControlButton
                    className={(isVideo ? buttonsData[0].onClass : buttonsData[0].offClass)}
                    legend={isMobile ? '' : (userScreen ? "Can't access camera during screen sharing" : (isVideo ? buttonsData[0].onLegend : buttonsData[0].offLegend))}
                    icon={(isVideo ? buttonsData[0].onIcon : buttonsData[0].offIcon)}
                    disabled={userScreen}
                    iconColor={(isVideo ? buttonsData[0].onIconColor : buttonsData[0].offIconColor)}
                    onClick={onCamButtonClick}
                />
                {/*mic button*/}
                <ControlButton
                    className={(isAudio ? buttonsData[1].onClass : buttonsData[1].offClass)}
                    legend={isMobile ? '' : (isAudio ? buttonsData[1].onLegend : buttonsData[1].offLegend)}
                    icon={(isAudio ? buttonsData[1].onIcon : buttonsData[1].offIcon)}
                    iconColor={(isAudio ? buttonsData[1].onIconColor : buttonsData[1].offIconColor)}
                    onClick={onMicButtonClick}
                />
                {
                    isMobile &&
                    <ControlButton className={'toggle-camera'} iconColor={buttonsData[7].onIconColor} onClick={onToggleCamButtonClick} icon={buttonsData[7].onIcon}/>
                }
                {/*screen share button*/}
                <ControlButton
                    className={(userScreen ? buttonsData[2].onClass : buttonsData[2].offClass)}
                    legend={isMobile ? '' : (userScreen ? buttonsData[2].onLegend : buttonsData[2].offLegend)}
                    icon={(userScreen ? buttonsData[2].onIcon : buttonsData[2].offIcon)}
                    iconColor={(userScreen ? buttonsData[2].onIconColor : buttonsData[2].offIconColor)}
                    onClick={onScreenButtonClick}
                    hide={isMobile}
                />
                {/*chat button*/}
                <ControlButton
                    className={(props.chatButtonState ? buttonsData[3].onClass : buttonsData[3].offClass)}
                    legend={isMobile ? '' : (props.chatButtonState ? buttonsData[3].onLegend : buttonsData[3].offLegend)}
                    icon={(props.chatButtonState ? buttonsData[3].onIcon : buttonsData[3].offIcon)}
                    iconColor={(props.chatButtonState ? buttonsData[3].onIconColor : buttonsData[3].offIconColor)}
                    onClick={props.onChatButtonClick}
                />
                {/*copy link button*/}
                {
                    isMobile ?
                    <ControlButton
                        onClick={handleShareButtonClick}
                        icon={buttonsData[6].onIcon}
                        iconColor={buttonsData[6].onIconColor}
                    /> :
                    <ControlButton
                        legend={isMobile ? '' : copyLinkLegend}
                        icon={buttonsData[5].onIcon}
                        iconColor={buttonsData[5].onIconColor}
                        onClick={copyLinkToClipBoard}
                        hide={!document.queryCommandSupported('copy')}
                        onMouseOut={onMouseOutCopyButton}
                    />
                }
                {/*leave button*/}
                <ControlButton
                    legend={isMobile ? '' : isRoomOwner ? '' : buttonsData[4].onLegend}
                    icon={buttonsData[4].onIcon}
                    iconColor={buttonsData[4].onIconColor}
                    onClick={onLeaveButtonClick}
                    className={"show-leave-dropdown"}
                >
                    {isRoomOwner && <DropdownContent dropdownClasses={"leave-dropdown"} options={maxOptionsMenu} />}
                </ControlButton>
            </div>
        </div>
    );
}

export default RoomFooter;