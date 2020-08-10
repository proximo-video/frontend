import React, { ReactElement } from 'react';
import { FiMinimize2, FiMaximize } from 'react-icons/fi';
import '../../assets/scss/custom/roomExpand.scss';
import Dropdown from './Dropdown';
import DropdownOption from './expandedRoomDataType';
import {VideoElement} from './videoDataType';
import {RoomMainProps, WebRTCMediaCell} from "./RoomMain";

export interface RoomMainExpandProps extends RoomMainProps {
    maxVideoId: string;
}

export default function RoomMainExpand(props: RoomMainExpandProps) {
    let maxOptionsMenu: DropdownOption[] = [];
    let maxWebRTCMedia: ReactElement | null = null;
    const normalWebRTCMedia: ReactElement[] = [];
    props.videoElements.forEach((value: VideoElement, key: string) => {
        if (props.maxVideoId === key) {
            maxWebRTCMedia =
                <video muted ref={value.videoRef} key={key} autoPlay className="video-stream"/>;
            maxOptionsMenu = [
                new DropdownOption(<FiMinimize2 />, 'Minimize', () => props.onMaximizeClick(key)),
                new DropdownOption(<FiMaximize />, 'Fullscreen', () => props.onFullscreenClick(key)),
            ];
        } else
            normalWebRTCMedia.push(<WebRTCMediaCell videoRef={value.videoRef} key={key} onMaximizeClick={() => props.onMaximizeClick(key)}
                onFullscreenClick={() => props.onFullscreenClick(key)} />);
    });
    return (
        <>
            <div className="room-expanded">
                <Dropdown options={maxOptionsMenu} />
                {maxWebRTCMedia}
            </div>
            <div className="side-video-container">
                {normalWebRTCMedia}
            </div>
        </>
    );
}