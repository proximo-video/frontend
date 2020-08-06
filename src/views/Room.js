import React, { useState, useRef, useEffect } from 'react';
import Socket from '../utils/Socket';
import RoomEntry from './RoomEntry';
import { v4 as uuidv4 } from 'uuid';

function Room(props) {
    let videoRefArray = [];
    // auth=0 Checking, 1 - loggedin & owner, 2 -loggedin &guest, 3- Not Logged-in guest
    const [auth, setAuth] = useState(0);
    const [name, setName] = useState("");
    const [id, setID] = useState(0);
    const localStream = useRef()
    const [iceServer, setIceServer] = useState()
    const [mediaSuccess, setMediaSuccess] = useState(false);
    const [iceSuccess, setIceSuccess] = useState(false)
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
                    setIceSuccess(true);
                    setIceServer(data.iceServers);
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        fetchData();
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

    const fetchData = async () => {
        let response = await fetch('https://proximo-video.herokuapp.com/getUser', { credentials: 'include' });
        if (response.ok) {
            let data = await response.json()
            console.log(data);
            console.log("id", id);
            setID(data.id);
            setName(data.name);
            console.log(data)
            if(roomId===data.rooms.find(element => element.room_id===roomId).room_id)
                setAuth(1);
            else
                setAuth(2);
        }
        else {
            setID(uuidv4());
            setAuth(3);
        }
    }

    useEffect(() => {
        const sa = Array.from(remoteStreams);
        for (const videoElement in videoRefArray) {
            videoRefArray[videoElement].current.srcObject = sa[videoElement][1][0];
        }
    })

    const createSocket = () => {
        Socket(auth === 1 ? "START" : "JOIN", id, roomId, connections, updateConnection, addStream, deleteStream, localStream.current.srcObject, iceServer);
    }
    videoRefArray = []
    console.log(auth)
    return (auth===0?<></>:auth===1 || auth===2?
        <>
            
                <RoomEntry logged={true} createSocket={createSocket} iceSuccess={iceSuccess} mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess} ref={localStream}></RoomEntry>
            {
                Array.from(remoteStreams).map((v) => {
                    const videoRef = React.createRef();
                    const videoNode = <video key={v[0]} ref={videoRef} autoPlay />
                    videoRefArray.push(videoRef)
                    return videoNode
                })}

            </>: <RoomEntry setName={setName} logged={false} createSocket={createSocket} iceSuccess={iceSuccess} mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess} ref={localStream}></RoomEntry>
    )
}

export default Room;