import React, { useEffect,useRef } from 'react';
import { localStream } from '../middleware/getUserMedia';
import { getUserMedia, toggleAudio, toggleVideo } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { detect } from 'detect-browser';
import {ControlButton} from './Room/RoomFooter';
import {buttonsData} from './Room/buttonsDataType';

const PersonalMedia = (props) => {
    const browser = detect();
    const videoRef = useRef();
    const dispatch = useDispatch();
    const userMedia = useSelector(state => state.userMedia);
    const isAudio = useSelector(state => state.userMediaPreference.isAudio);
    const isVideo = useSelector(state => state.userMediaPreference.isVideo);
    useEffect(() => {
        // const getFeed = async () => {
        //     try {
        //         ref.current.srcObject = await GetLocalWebCamFeed(isAudio, isVideo);
        //         if (ref.current.srcObject) {
        //             props.setMediaSuccess(true);
        //         }
        //     }
        //     catch (e) {
        //         console.log(e)
        //     }
        // }
        // getFeed();
        if (userMedia) {
            videoRef.current.srcObject = localStream
            if (videoRef.current.srcObject) {
                props.setMediaSuccess(true);
            }
        } else {
            dispatch(getUserMedia(true));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMedia]);
    const toggleVideoStream = () => {
        // if (isVideo) {
        //     ref.current.srcObject.getVideoTracks()[0].stop();
        //     ref.current.srcObject.getAudioTracks()[0].stop();
        //     //setVideo(false);
        // }
        // else {
        //     ref.current.srcObject.getAudioTracks()[0].stop();
        //     //setVideo(true);
        // }
        dispatch(toggleVideo());
        if (!(browser &&  browser.name=== 'firefox') && !isVideo)
            dispatch(getUserMedia(false));
    }

    const toggleAudioStream = () => {
        // ref.current.srcObject.getAudioTracks()[0].enabled = !isAudio;
        // //setAudio(!isAudio);
        dispatch(toggleAudio());
    }

    return (
        <>
            <div className="is-relative">
                {/*<div className={"inner-video"}>*/}
                    <video className="self-video" ref={videoRef} autoPlay muted playsInline/>
                    <div className={"overlay-message"} style={isVideo ? {display: 'none'} : {}}>
                        <p>Your camera is off</p>
                        {!isAudio && <p>Your mic is off</p>}
                    </div>
                    <div className="is-center-flex video-controls">
                        <div className={"button-wrapper"}>
                            <ControlButton
                                className={(isVideo ? buttonsData[0].onClass : buttonsData[0].offClass) + ' room-entry-button'}
                                icon={(isVideo ? buttonsData[0].onIcon : buttonsData[0].offIcon)}
                                iconColor={(isVideo ? buttonsData[0].onIconColor : buttonsData[0].offIconColor)}
                                onClick={toggleVideoStream}
                                disabled={!props.mediaSuccess}
                            />
                            <ControlButton
                                className={(isAudio ? buttonsData[1].onClass : buttonsData[1].offClass) + ' room-entry-button'}
                                icon={(isAudio ? buttonsData[1].onIcon : buttonsData[1].offIcon)}
                                iconColor={(isAudio ? buttonsData[1].onIconColor : buttonsData[1].offIconColor)}
                                onClick={toggleAudioStream}
                                disabled={!props.mediaSuccess}
                            />
                            {/*<button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleAudioStream}>{isAudio ? <IoMdMic className="cntrl-button medium-icon" /> : <IoMdMicOff className="cntrl-button" />}</button>*/}
                            {/*<button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleVideoStream}>{isVideo ? <RiCameraLine className="cntrl-button medium-icon" /> : <RiCameraOffLine className="cntrl-button" />}</button>*/}
                        </div>
                    </div>
                {/*</div>*/}
            </div>
        </>
    )
}

export default PersonalMedia;