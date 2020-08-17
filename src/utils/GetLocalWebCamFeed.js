async function GetLocalWebCamFeed(audio, video, facingMode) {

    let constraints = {
        width: { ideal: 640 },
        height: { ideal: 480 },
        audio: true,
        video: video ? {
            facingMode: facingMode,
        } : video
    }
    navigator.getWebcam = (navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.moxGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
    if (navigator.mediaDevices.getUserMedia) {
        try {
            let stream = await navigator.mediaDevices.getUserMedia(constraints)
            stream.getAudioTracks()[0].enabled = audio;
            return stream;
        }
        catch (e) { console.log(e.name + ": " + e.message); };
    } else {
        try {
            let stream = await navigator.getWebcam({ audio: true, video: video });
            stream.getAudioTracks()[0].enabled = audio;
        } catch (e) { console.log(e.name + ": " + e.message); };

    }
}

export default GetLocalWebCamFeed;