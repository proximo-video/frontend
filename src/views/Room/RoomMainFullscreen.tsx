import {FiMinimize} from "react-icons/fi";
import React, {ReactElement, useEffect} from "react";
import '../../assets/scss/custom/roomFullscreen.scss';
// import {RoomMainExpandProps} from "./RoomMainExpand";
// import {VideoElement} from "./videoDataType";
import {RoomMainProps} from "./RoomMain";

declare global {
    interface Document {
        webkitIsFullScreen: any;
        mozFullScreen: any;
        msFullscreenElement: any;
    }
}

export interface RoomMainFullscreenProps extends RoomMainProps{
    fullscreenVideoId: string;
}

export default function RoomMainFullscreen(props: RoomMainFullscreenProps) {
    // let fullscreenElement;
    let fullscreenWebRTCMedia: ReactElement | null = null;
    // let fullscreenUserId:string = "";
    const exitHandler = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
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

    if (props.videoElements.has(props.fullscreenVideoId)) {
        fullscreenWebRTCMedia = <video ref={props.videoElements.get(props.fullscreenVideoId).videoRef} autoPlay className="video-stream"/>;
    }

    return (
        <div className={"room-fullscreen"}>
            <div className="exit-fullscreen" onClick={() => props.onFullscreenClick(props.fullscreenVideoId)}>
                <FiMinimize/>
                <span>Exit full screen</span>
            </div>
            {fullscreenWebRTCMedia}
        </div>
    );
}
