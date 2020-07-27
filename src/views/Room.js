import React, { useState, useRef, useEffect } from 'react';
import PersonalMedia from './PersonalMedia';
import Socket from '../utils/Socket';
import { Link } from 'react-router-dom'

function Room(props) {
    let videoRefArray = new Array();
    const localStream = useRef()
    const [iceServer, setIceServer] = useState()
    const [mediaSuccess, setMediaSuccess] = useState(false);
    const [remoteStreams, setRemoteStreams] = useState(new Map());
    const addStream = (k, v) => {
        setRemoteStreams(new Map(remoteStreams.set(k, v)));
    }
    const deleteStream = (k) => {
        setRemoteStreams(new Map(getDeletedMap(remoteStreams, k)))
    }
    const getDeletedMap = (remoteStreams, k) => {
        remoteStreams.delete(k);
        console.log(remoteStreams)
        return remoteStreams;
    }
    const [connections, setConnection] = useState(new Map());
    const updateConnection = (k, v) => {
        setConnection(new Map(connections.set(k, v)));
    }
    const { match } = props;
    const roomId = match.params.roomId;
    useEffect(() => {
        const checkRoom = async () => {
            try {
                let response = await fetch('https://proximo-video.herokuapp.com/checkRoom', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ room_id: roomId })
                });
                if (response.ok) {
                    console.log("Ok");
                }
                else {
                    console.log("Not Found");
                }
            } catch (e) { console.error(e) }
        }

        const getIceServer = async () => {
            try {
                let response = await fetch('https://proximo-video.herokuapp.com/iceserver');
                if (response.ok) {
                    let data = await response.json()
                    console.log(data.iceServers);
                    setIceServer(data.iceServers);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        checkRoom();
        getIceServer();
        return () => {
            console.log("Byee Room")
            if (connections) {
                connections.forEach((value) => {
                    value.close();
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const sa = Array.from(remoteStreams);
        for (const videoElement in videoRefArray) {
            videoRefArray[videoElement].current.srcObject = sa[videoElement][1][0];
        }
    })

    const createSocket = () => {
        Socket("JOIN", Math.floor((Math.random() * 100000) + 1).toString(), roomId, connections, updateConnection, addStream, deleteStream, localStream.current.srcObject, iceServer);
    }
    videoRefArray = []
    return (
        <>
            <PersonalMedia mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess} ref={localStream}></PersonalMedia>
            <button disabled={!mediaSuccess} onClick={createSocket}>Start</button>

            <div><Link to={{ pathname: "/" }}>Hello</Link></div>    
            {Array.from(remoteStreams).map((v) => {
                const videoRef = React.createRef();
                const videoNode = <video key={v[0]} ref={videoRef} autoPlay />
                videoRefArray.push(videoRef)
                return videoNode
            })}

        </>
    )
}

export default Room;