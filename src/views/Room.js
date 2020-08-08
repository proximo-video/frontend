import React, { useState, useRef, useEffect } from 'react';
import Socket from '../utils/Socket';
import RoomEntry from './RoomEntry';
import { v4 as uuidv4 } from 'uuid';
import LayoutDefault from '../layouts/LayoutDefault'
import {useDispatch,useSelector} from 'react-redux';
import {setId,saveStream} from '../redux/actions';
function Room(props) {
    const dispatch = useDispatch();
    const id = useSelector(state=>state.id);
    const name = useSelector(state=>state.name);
    const rooms = useSelector(state=>state.rooms);
    const isLogged = useSelector(state=>state.isLogged);
    let videoRefArray = [];
    // auth=0 Checking, 1 - loggedin & owner, 2 -loggedin &guest, 3- Not Logged-in guest
    const [fetched, setFetched] = useState(false);
    // const [name, setName] = useState("");
    // const [id, setID] = useState(0);
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
        if(!isLogged){
            dispatch(setId(uuidv4()))
        }
        checkRoom();
        getIceServer();
        setFetched(true);
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
        Socket(isLogged? "START" : "JOIN", id, roomId, connections, updateConnection, addStream, deleteStream, localStream.current.srcObject, iceServer);
    }
    videoRefArray = []
    return (<LayoutDefault>
        {!fetched?<></>:isLogged?
        <>
                
                <RoomEntry logged={true} createSocket={createSocket} iceSuccess={iceSuccess} mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess} ref={localStream}></RoomEntry>
            {
                Array.from(remoteStreams).map((v) => {
                    const videoRef = React.createRef();
                    const videoNode = <video key={v[0]} ref={videoRef} autoPlay />
                    videoRefArray.push(videoRef)
                    return videoNode
                })}

            </>: <RoomEntry logged={false} createSocket={createSocket} iceSuccess={iceSuccess} mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess} ref={localStream}></RoomEntry>}
            </LayoutDefault>
    )
}

export default Room;