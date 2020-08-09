import React, { useEffect, useState,useRef } from 'react';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';
import { localStream } from '../middleware/getUserMedia';
import { getUserMedia, toggleAudio, toggleVideo } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { detect } from 'detect-browser';

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
        if (!(browser &&  browser.name=== 'firefox'))
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
                {<video className="self-video" ref={videoRef} autoPlay muted></video>}
                <div className="is-center-flex video-controls">
                    <div className="button-wrapper">
                        <button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleAudioStream}>{isAudio ? <IoMdMic className="cntrl-button medium-icon" /> : <IoMdMicOff className="cntrl-button" />}</button>
                        <button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleVideoStream}>{isVideo ? <RiCameraLine className="cntrl-button medium-icon" /> : <RiCameraOffLine className="cntrl-button" />}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PersonalMedia;