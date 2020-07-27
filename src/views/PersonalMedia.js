import React, { useEffect, useState, useRef } from 'react';
import GetLocalWebCamFeed from '../utils/GetLocalWebCamFeed';

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

    useEffect(()=>{
        console.log("PersonalMedia mounted")
        return () => {
            console.log("PersonalMedia Unmounted")
            ref.current.srcObject.getVideoTracks()[0].stop();
            ref.current.srcObject.getAudioTracks()[0].stop();
          }
    },[])

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
            {ref ? <video ref={ref} autoPlay muted></video> : <div></div>}
            <button disabled={!props.mediaSuccess} onClick={toggleAudio}>Audio Toggle</button>
            <button disabled={!props.mediaSuccess} onClick={toggleVideo}>Video Toggle</button>
        </>
    )
})

export default PersonalMedia;