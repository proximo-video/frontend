import React, { useEffect, useState } from 'react';
import GetLocalWebCamFeed from '../utils/GetLocalWebCamFeed';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { RiCameraLine, RiCameraOffLine } from 'react-icons/ri';

const PersonalMedia = React.forwardRef((props, ref) => {
    const [isAudio, setAudio] = useState(true);
    const [isVideo, setVideo] = useState(true);
    useEffect(() => {
        const getFeed = async () => {
            try {
                ref.current.srcObject = await GetLocalWebCamFeed(isAudio, isVideo);
                if (ref.current.srcObject) {
                    props.setMediaSuccess(true);
                }
            }
            catch (e) {
                console.log(e)
            }
        }
        getFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideo]);

    useEffect(() => {
        console.log("PersonalMedia mounted")
        return () => {
            console.log("PersonalMedia Unmounted")
            // eslint-disable-next-line
            ref.current.srcObject.getVideoTracks()[0].stop();
            // eslint-disable-next-line
            ref.current.srcObject.getAudioTracks()[0].stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleVideo = () => {
        if (isVideo) {
            ref.current.srcObject.getVideoTracks()[0].stop();
            ref.current.srcObject.getAudioTracks()[0].stop();
            setVideo(false);
        }
        else {
            ref.current.srcObject.getAudioTracks()[0].stop();
            setVideo(true);
        }
    }

    const toggleAudio = () => {
        ref.current.srcObject.getAudioTracks()[0].enabled = !isAudio;
        setAudio(!isAudio);
    }



    return (
        <>
            <div className="is-relative">
                {ref ? <video className="self-video" ref={ref} autoPlay muted></video> : <div></div>}
                <div className="is-center-flex video-controls">
                    <div className="button-wrapper">
                        <button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleAudio}>{isAudio ? <IoMdMic className="cntrl-button medium-icon" /> : <IoMdMicOff className="cntrl-button" />}</button>
                        <button className="icon-button" disabled={!props.mediaSuccess} onClick={toggleVideo}>{isVideo ? <RiCameraLine className="cntrl-button medium-icon" /> : <RiCameraOffLine className="cntrl-button" />}</button>
                    </div>
                </div>
            </div>
        </>
    )
})

export default PersonalMedia;