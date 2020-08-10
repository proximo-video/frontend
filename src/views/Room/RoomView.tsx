import '../../assets/scss/custom/room.scss';
import React, { useState, useRef, useEffect } from 'react';
import "./RoomFooter";
import RoomFooter from './RoomFooter';
import { videoDataType, VideoElement } from './videoDataType';
import RoomMainExpand from './RoomMainExpand';
import RoomMain from "./RoomMain";
import RoomMainFullscreen from "./RoomMainFullscreen";
import RoomChat from "./RoomChat";
import MessageNotification from "./MessageNotification";
import { localStream } from '../../middleware/getUserMedia';
import { remoteStreams } from '../../middleware/webRTC';
// eslint-disable-next-line
import { getUserMedia, toggleAudio, toggleVideo } from '../../redux/actions';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { detect } from 'detect-browser';

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}

function RoomView() {
    // 5 buttons 0=>cam, 1=>mic, 2=>screen, 3=>chat, 4=>leave, buttons array denoting the
    const [buttonsState, setButtonsState] = useState<boolean[]>([false, false, true, false, false]);
    // eslint-disable-next-line
    const browser = detect();
    const dispatch = useDispatch();
    const userMedia = useSelector((state: RootStateOrAny) => state.userMedia);
    const id = useSelector((state: RootStateOrAny) => state.id);
    const name = useSelector((state: RootStateOrAny) => state.name);
    // eslint-disable-next-line
    const isAudio = useSelector((state: RootStateOrAny) => state.userMediaPreference.isAudio);
    // eslint-disable-next-line
    const isVideo = useSelector((state: RootStateOrAny) => state.userMediaPreference.isVideo);
    const remoteStreamCount = useSelector((state: RootStateOrAny) => state.remoteStreamCount);
    const selfVideo = useRef();
    videoDataType.set(id, new VideoElement(selfVideo, false, false, id, name));
    const [videoElements, setVideoElements] = useState<Map<string, VideoElement>>(videoDataType);
    const [isAnyVideoMax, setIsAnyVideoMax] = useState<boolean>(false);
    const [isAnyVideoFullscreen, setIsAnyVideoFullscreen] = useState<boolean>(false);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    useEffect(() => {
        if (userMedia) {
            if (selfVideo.current){
                //@ts-ignore
                selfVideo.current.srcObject = localStream
                //@ts-ignore
                selfVideo.current.muted = true;
            }
        } else {
            dispatch(getUserMedia(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMedia]);

    useEffect(() => {
        console.log("first");
        videoElements.forEach((_, key) => {
            if (!remoteStreams.has(key) && key !== id)
                console.log(videoElements.delete(key));
        });
        remoteStreams.forEach((_, key) => {
            if (!videoElements.has(key)) {
                const videoRef = React.createRef();
                const newVideoElement = new VideoElement(videoRef, false, false, key, "abc");
                setVideosLayout(videoElements.size + 1);
                setVideoElements(new Map(videoElements.set(key, newVideoElement)));
            }

        })
        // eslint-disable-next-line
    }, [remoteStreams]);

    useEffect(() => {
        console.log("self video: ", selfVideo);
        if (selfVideo.current){
            //@ts-ignore
            selfVideo.current.srcObject = localStream
            //@ts-ignore
            selfVideo.current.muted = true;
        }
        console.log("second")
        console.log(remoteStreams)
        console.log(videoElements)
        remoteStreams.forEach((value, key) => {
            if (videoElements.has(key)) {
                if (videoElements.get(key).videoRef.current)
                    videoElements.get(key).videoRef.current.srcObject = value[0];
            }
        })
        // eslint-disable-next-line
    }, [remoteStreamCount,isAnyVideoMax,isAnyVideoFullscreen]);

    const handleButtonClick = (i: number) => {
        const newButtonsState = buttonsState.slice();
        newButtonsState[i] = !buttonsState[i];
        setButtonsState(newButtonsState);
        if (i === 3)
            setIsChatOpen(newButtonsState[i]);
    };

    const isMobile = () => {
        return window.innerWidth <= 700;
    };

    const setVideosLayout = (n: number) => {
        const cont = document.querySelector<HTMLElement>(':root') as HTMLElement;
        let perRow = Math.ceil(Math.sqrt(n));
        if (isMobile()) {
            if (n === 2)
                perRow = 1;
            else
                perRow = 2;
        }
        cont.style.setProperty('--per-row', perRow.toString());
        const noOfRows = Math.ceil(n / perRow);
        cont.style.setProperty('--rows', noOfRows.toString());
    };

    const addUser = () => {
        // generate some random key, para and title
        const videoRef = React.createRef();
        const newVideoElement = new VideoElement(videoRef, false, false, id, name);
        setVideosLayout(videoElements.size + 1);
        setVideoElements(new Map(videoElements.set(Math.random().toString(36).slice(2), newVideoElement)));
    };


    const handleMaximizeButtonClick = (userId: string) => {
        if (videoElements.has(userId) && videoElements.size > 1) {
            const newVideoElements = new Map<string, VideoElement>(videoElements);
            newVideoElements.get(userId).isMax = !videoElements.get(userId).isMax;
            setIsAnyVideoMax(newVideoElements.get(userId).isMax);
            newVideoElements.forEach((value: VideoElement, key: string) => {
                if (key !== userId)
                    newVideoElements.get(key).isMax = false;
            });
            setVideoElements(newVideoElements);
        }
    };

    const handleFullscreenButtonClick = async (userId) => {
        if (videoElements.has(userId)) {
            // console.log("fullscreen request from user:", userId);
            const newVideoElements = new Map(videoElements);
            newVideoElements.get(userId).isFullscreen = !videoElements.get(userId).isFullscreen;
            newVideoElements.forEach((value: VideoElement, key: string) => {
                if (key !== userId)
                    newVideoElements.get(key).isFullscreen = false;
            });
            if (newVideoElements.get(userId).isFullscreen) {
                const elem = document.documentElement;
                if (elem.requestFullscreen) {
                    await elem.requestFullscreen();
                } else if (elem.mozRequestFullscreen) { /* Firefox */
                    await elem.mozRequestFullscreen();
                } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    await elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) { /* IE/Edge */
                    await elem.msRequestFullscreen();
                }
                // await document.documentElement.requestFullscreen();
            } else if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    await document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    await document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    await document.msExitFullscreen();
                }
            }
            setIsAnyVideoFullscreen(newVideoElements.get(userId).isFullscreen);
            setVideoElements(newVideoElements);
        }
    }

    const backdropClick = () => {
        const newButtonsState = buttonsState.slice();
        setIsChatOpen(false);
        newButtonsState[3] = false;
        setButtonsState(newButtonsState);
    };

    // const handleDeleteUser = (userId) => {
    //     if(videoElements.has(userId)) {
    //         if(videoElements.get(userId).isMax)
    //             setIsAnyVideoMax(false);
    //         setVideoElements(new Map(getDeletedMap(videoElements, userId)));
    //     }
    // };
    //
    // const getDeletedMap = (videoElements, userId) => {
    //     videoElements.delete(userId);
    //     return videoElements;
    // };

    return (
        <div className="room-main">
            <div className={"video-container" + (isChatOpen ? " chat-open" : "")}>
                {
                    isAnyVideoFullscreen ?
                        <RoomMainFullscreen videoElements={videoElements}
                            onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                            onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)} /> : (
                            isAnyVideoMax ?
                                <RoomMainExpand videoElements={videoElements}
                                    onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                                    onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)} /> :
                                <RoomMain videoElements={videoElements}
                                    onMaximizeClick={(userId: string) => handleMaximizeButtonClick(userId)}
                                    onFullscreenClick={(userId: string) => handleFullscreenButtonClick(userId)} />)
                }
            </div>
            <RoomChat isChatOpen={isChatOpen} onClose={backdropClick} />
            <button className="button is-primary addVideo" onClick={() => addUser()}>Primary</button>
            <MessageNotification/>
            <RoomFooter buttonsState={buttonsState} onClick={(i: number) => handleButtonClick(i)} />
        </div>
    );
}

export default RoomView;