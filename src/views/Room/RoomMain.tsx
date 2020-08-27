import React, {ReactElement, useEffect} from 'react';
import DropdownOption from "./expandedRoomDataType";
import {FiMaximize, FiMaximize2, FiMicOff, FiMinimize, FiMinimize2, FiMinusCircle} from "react-icons/fi";
import Dropdown from "./Dropdown";
import {VideoElement} from './videoDataType';
import {RootStateOrAny, useSelector,useDispatch} from "react-redux";
import {sendMessage,removeUser} from '../../redux/actions';
import Avatar from "./Avatar";
import '../../assets/scss/custom/roomMain.scss';
import '../../assets/scss/custom/dropdown.scss';
import {MdPresentToAll} from "react-icons/all";


declare global {
    interface Document {
        webkitIsFullScreen: any;
        mozFullScreen: any;
        msFullscreenElement: any;
    }
}


function getWindowSize() {
    return {
        height: window.innerHeight,
        width: window.innerWidth,
    };
}

export interface RoomMainProps {
    videoElements: Map<string, VideoElement>;
    onMaximizeClick: (i: string) => void;
    onFullscreenClick: (i: string) => void;
    maxVideoId: string;
    fullscreenVideoId: string;
}

export default function RoomMain(props: RoomMainProps) {
    const dispatch = useDispatch();
    const webRTCMedia: ReactElement[] = [];
    let countNormalWebRTCMedia: number = 0;
    let maxMediaStyle: React.CSSProperties;
    let dropdownOptionClassName = '';
    const isRoomOwner = useSelector((state: RootStateOrAny) => state.isRoomOwner);
    // let fullscreenUserId: string = "";
    // const size = useWindowSize();
    const size = getWindowSize();
    const users = useSelector((state: RootStateOrAny) => state.remoteUsers);
    const isAudio = useSelector((state: RootStateOrAny) => state.userMediaPreference.isAudio);
    const isVideo = useSelector((state: RootStateOrAny) => state.userMediaPreference.isVideo);
    const id = useSelector((state: RootStateOrAny) => state.id);
    const name = useSelector((state: RootStateOrAny) => state.name);
    const userScreen = useSelector((state: RootStateOrAny) => state.userScreen);

    const exitHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            // console.log("Firing fullscreen change event; curr fullscreenUserId: ", props.fullscreenVideoId);
            props.onFullscreenClick(props.fullscreenVideoId);
        }
    };

    useEffect(() => {
        // fullscreenElement = document.querySelector('.room-fullscreen');
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);
        // document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('fullscreenchange', exitHandler);
            document.removeEventListener('webkitfullscreenchange', exitHandler);
            document.removeEventListener('mozfullscreenchange', exitHandler);
            document.removeEventListener('MSFullscreenChange', exitHandler);
            // document.removeEventListener('keydown', handleKeydown);
        }
        // eslint-disable-next-line
    }, []);

    if (size.width > 700) {
        maxMediaStyle = {
            width: '75%',
            height: '100%',
            padding: '5px',
        }
    } else if (size.width > 415) {
        maxMediaStyle = {
            width: '100%',
            height: '75%',
            padding: '2px',
        }
    } else {
        maxMediaStyle = {
            width: '100%',
            height: '80%',
            padding: '2px',
        }
    }

    const handleRemoveUser = (userId: string) => {
        dispatch(sendMessage({id:id,action:'REMOVEUSER',message:{id:userId}}))
        dispatch(removeUser(userId));
        // console.log("User removed:", userId);
    }


    if (props.videoElements.size <= 1 && props.maxVideoId === '')
        dropdownOptionClassName = 'disabled';

    props.videoElements.forEach((value: VideoElement, key: string) => {
        const removeUserDropdownOption = new DropdownOption(
            <FiMinusCircle/>, 'Remove user', () => handleRemoveUser(key), 'remove-user-option');
        const maxOptionsMenu = [
            new DropdownOption(<FiMinimize2/>, 'Minimize', () => props.onMaximizeClick(key), dropdownOptionClassName),
            new DropdownOption(<FiMaximize/>, 'Fullscreen', () => props.onFullscreenClick(key)),
        ];
        const normalOptionsMenu: DropdownOption[] = [
            new DropdownOption(<FiMaximize2/>, 'Maximize', () => props.onMaximizeClick(key), dropdownOptionClassName),
            new DropdownOption(<FiMaximize/>, 'Fullscreen', () => props.onFullscreenClick(key)),
        ];
        if (isRoomOwner && key !== id) {
            maxOptionsMenu.push(removeUserDropdownOption);
            normalOptionsMenu.push(removeUserDropdownOption);
        }
        let normalMediaStyle: React.CSSProperties;
        if (size.width > 700) {
            const top: number = countNormalWebRTCMedia * 33;
            normalMediaStyle = {
                top: top.toString() + "%",
                right: 0,
                width: '25%',
                height: '33%',
                padding: '5px',
            };
        } else {
            const left: number = countNormalWebRTCMedia * 33;
            normalMediaStyle = {
                left: left.toString() + "%",
                bottom: 0,
                width: '33%',
                padding: '2px',
            };
            if (size.width > 415)
                normalMediaStyle.height = '25%';
            else
                normalMediaStyle.height = '20%';
        }

        if (props.fullscreenVideoId !== '' && props.fullscreenVideoId !== key) {
            normalMediaStyle.display = 'none';
            if (props.maxVideoId === key)
                maxMediaStyle.display = 'none';
        }

        if (props.maxVideoId !== '' && props.maxVideoId !== key)
            countNormalWebRTCMedia += 1;

        let displayMicOff: boolean = false;
        let displayAvatar: boolean = false;
        let displayName: string = '';
        let isScreen: boolean = false;
        let disconnected: boolean = false;
        if (users.hasOwnProperty(key)) {
            if (users[key].hasOwnProperty('isAudio'))
                displayMicOff = !users[key]['isAudio'];
            if (users[key].hasOwnProperty('isVideo') && users[key].hasOwnProperty('isScreen'))
                displayAvatar = !users[key]['isVideo'] && !users[key]['isScreen'];
            if (users[key].hasOwnProperty('displayName'))
                displayName = users[key]['displayName'];
            if (users[key].hasOwnProperty('isScreen'))
                isScreen = users[key]['isScreen'];
            if (users[key].hasOwnProperty('disconnected'))
                disconnected = users[key]['disconnected'];
        } else if (key === id) {
            displayMicOff = !isAudio;
            displayAvatar = !isVideo && !userScreen;
            displayName = name;
        }

        webRTCMedia.push(
            <div
                key={key}
                className={(props.fullscreenVideoId === key ? 'fullscreen' : (props.maxVideoId === '' ? "video" : (props.maxVideoId === key ? "expanded" : ("webrtc-media-cell" + (size.width <= 700 ? " mobile" : "")))))}
                style={(props.fullscreenVideoId !== '' ? (props.fullscreenVideoId === key ? {} : {display: "none"}) : (props.maxVideoId !== '' ? (props.maxVideoId === key ? maxMediaStyle : normalMediaStyle) : {}))}
                onDoubleClick={() => props.onFullscreenClick(key)}
            >
                <div className="inner">
                    {
                        props.fullscreenVideoId === key ?
                            <div className="exit-fullscreen"
                                 onClick={() => props.onFullscreenClick(props.fullscreenVideoId)}>
                                <FiMinimize/>
                                <span>EXIT</span>
                            </div> :
                            <Dropdown dropdownClasses={"video-dropdown"}
                                      options={key === props.maxVideoId ? maxOptionsMenu : normalOptionsMenu}/>
                    }
                    {displayMicOff && <div className={"no-audio"}><FiMicOff/></div>}
                    {displayAvatar && <Avatar name={displayName} className={'no-video-avatar'}/>}
                    {
                        key === id && userScreen &&
                        <div className={"presentation-message"}>
                            <MdPresentToAll/>
                            <p>You're presenting to everyone</p>
                        </div>
                    }
                    {
                        disconnected &&
                        <div className={"presentation-message reconnect-message"}>
                            <p>Connection interrupted. Trying to reconnect...</p>
                        </div>
                    }
                    <video ref={value.videoRef} autoPlay muted playsInline className="video-stream" style={displayAvatar || (key === id && userScreen) ? {display: 'none'} : (isScreen ? {objectFit: 'contain'} : {})}/>
                    <audio ref={value.audioRef} autoPlay/>
                    {/*<video className="video-stream" poster={"/images/big_buck_bunny.jpg"}/>*/}
                </div>
            </div>
        );
    });
    return (
        <>
            {webRTCMedia}
        </>
    );
}