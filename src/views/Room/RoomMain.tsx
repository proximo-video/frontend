import React, {ReactElement} from 'react';
import '../../assets/scss/custom/room.scss';
import DropdownOption from "./expandedRoomData";
import {FiMaximize, FiMaximize2} from "react-icons/fi";
import Dropdown from "./Dropdown";
import {WebRTCMediaCellProps, RoomMainExpandProps} from "./RoomMainExpand";
import {VideoElement} from './videoData';


function WebRTCMediaCell(props: WebRTCMediaCellProps) {
    const normalOptionsMenu: DropdownOption[] = [
        new DropdownOption(<FiMaximize2/>, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize/>, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="video">
            <div className="inner">
                <Dropdown options={normalOptionsMenu}/>
                <video src="/videos/Big Buck Bunny.mp4" className="video-stream" poster="/images/big_buck_bunny.jpg"/>
            </div>
        </div>
    );
}

export default function RoomMain(props: RoomMainExpandProps) {
    const normalWebRTCMedia: ReactElement[] = [];
    props.videoElements.forEach((value: VideoElement, key: string) => {
        normalWebRTCMedia.push(<WebRTCMediaCell key={key} onMaximizeClick={() => props.onMaximizeClick(key)}
                                                onFullscreenClick={() => props.onFullscreenClick(key)}/>);
    })
    return (
        <>
            {normalWebRTCMedia}
        </>
    );
}