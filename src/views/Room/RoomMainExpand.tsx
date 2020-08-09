import React, { ReactElement } from 'react';
import { FiMaximize2, FiMinimize2, FiMaximize } from 'react-icons/fi';
import '../../assets/scss/custom/roomExpand.scss';
import Dropdown from './Dropdown';
import DropdownOption from './expandedRoomData';
import { VideoElement } from './videoData';

export interface WebRTCMediaCellProps {
    videoRef: any;
    onMaximizeClick: () => void;
    onFullscreenClick: () => void;
}

function WebRTCMediaCell(props: WebRTCMediaCellProps) {
    const normalOptionsMenu: DropdownOption[] = [
        new DropdownOption(<FiMaximize2 />, 'Maximize', props.onMaximizeClick),
        new DropdownOption(<FiMaximize />, 'Fullscreen', props.onFullscreenClick),
    ];
    return (
        <div className="webrtc-media-cell">
            <Dropdown options={normalOptionsMenu} />
            <video ref={props.videoRef} autoPlay className="video-stream" />
        </div>
    );
}

export interface RoomMainExpandProps {
    videoElements: Map<string, VideoElement>;
    onMaximizeClick: (i: string) => void;
    onFullscreenClick: (i: string) => void;
}

export default function RoomMainExpand(props: RoomMainExpandProps) {
    let maxOptionsMenu: DropdownOption[] = [];
    let maxWebRTCMedia: ReactElement | null = null;
    const normalWebRTCMedia: ReactElement[] = [];
    props.videoElements.forEach((value: VideoElement, key: string) => {
        if (value.isMax) {
            maxWebRTCMedia =
                <video ref={value.videoRef} key={key} autoPlay className="video-stream"
                />;
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