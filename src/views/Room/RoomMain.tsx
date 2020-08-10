import React, {ReactElement} from 'react';
import '../../assets/scss/custom/room.scss';
import DropdownOption from "./expandedRoomDataType";
import {FiMaximize, FiMaximize2} from "react-icons/fi";
import Dropdown from "./Dropdown";
import {VideoElement} from './videoDataType';

export interface WebRTCMediaCellProps {
    videoRef: any;
    onMaximizeClick: () => void;
    onFullscreenClick: () => void;
}

export function WebRTCMediaCell(props: WebRTCMediaCellProps) {
    const normalOptionsMenu: DropdownOption[] = [
        new DropdownOption(<FiMaximize2/>, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize/>, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="video">
            <div className="inner">
                <Dropdown options={normalOptionsMenu}/>
                <video ref={props.videoRef} autoPlay className="video-stream"/>
            </div>
        </div>
    );
}

export interface RoomMainProps {
    videoElements: Map<string, VideoElement>;
    onMaximizeClick: (i: string) => void;
    onFullscreenClick: (i: string) => void;
}

export default function RoomMain(props: RoomMainProps) {
    const normalWebRTCMedia: ReactElement[] = [];
    props.videoElements.forEach((value: VideoElement, key: string) => {
        normalWebRTCMedia.push(<WebRTCMediaCell videoRef={value.videoRef} key={key}
                                                onMaximizeClick={() => props.onMaximizeClick(key)}
                                                onFullscreenClick={() => props.onFullscreenClick(key)}/>);
    })
    return (
        <>
            {normalWebRTCMedia}
        </>
    );
}