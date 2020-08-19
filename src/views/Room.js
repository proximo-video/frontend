import React, { useState, useEffect } from 'react';
import RoomEntry from './RoomEntry';
import { v4 as uuidv4 } from 'uuid';
import LayoutDefault from '../layouts/LayoutDefault'
import { useDispatch, useSelector } from 'react-redux';
import { setId, closeMedia, getUserMedia, setIceServers, connectSocket, setRoomOwner } from '../redux/actions';
import RoomView from './Room/RoomView';

function Room(props) {
    const dispatch = useDispatch();
    const id = useSelector(state => state.id);
    const isRoomOwner = useSelector(state => state.isRoomOwner);
    const acceptEntry = useSelector(state => state.acceptEntry);
    const [isRoomLocked, setRoomLocked] = useState(false);
    const [showWaiting, setShowWaiting] = useState(false);
    // eslint-disable-next-line
    const name = useSelector(state => state.name);
    const rooms = useSelector(state => state.rooms);
    const isLogged = useSelector(state => state.isLogged);
    // auth=0 Checking, 1 - loggedin & owner, 2 -loggedin &guest, 3- Not Logged-in guest
    const [fetched, setFetched] = useState(false);
    // const [name, setName] = useState("");
    // const [id, setID] = useState(0);
    const [mediaSuccess, setMediaSuccess] = useState(false);
    const [iceSuccess, setIceSuccess] = useState(false)
    const [startRoomView, setStartRoomView] = useState(false);
    // const deleteStream = (k) => {
    //     setRemoteStreams(new Map(getDeletedMap(remoteStreams, k)))
    // }
    // const getDeletedMap = (remoteStreams, k) => {
    //     remoteStreams.delete(k);
    //     console.log(remoteStreams)
    //     return remoteStreams;
    // }
    // const [connections, setConnection] = useState(new Map());
    // const updateConnection = (k, v) => {
    //     setConnection(new Map(connections.set(k, v)));
    // }
    const { match } = props;
    const roomId = match.params.roomId;
    useEffect(() => {
        if (acceptEntry !== 'W')
            setShowWaiting(false);
        if (acceptEntry === 'A')
            setStartRoomView(true);
    }, [acceptEntry]);
    useEffect(() => {
        const checkRoom = async () => {
            try {
                let response = await fetch('http://api.proximo.pw/checkRoom', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ room_id: roomId })
                });
                if (response.ok) {
                    let data = await response.json();
                    setRoomLocked(data.is_locked)
                }
                else {
                    console.log("Not Found");
                }
            } catch (e) { console.error(e) }
        }

        const getIceServer = async () => {
            try {
                let response = await fetch('http://api.proximo.pw/iceserver');
                if (response.ok) {
                    let data = await response.json()
                    setIceSuccess(true);
                    dispatch(setIceServers(data.iceServers))
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        if (!isLogged) {
            dispatch(setId(uuidv4()))
        }
        for (const room of rooms) {
            if (room.room_id === roomId)
                dispatch(setRoomOwner(true));
        }
        checkRoom();
        getIceServer();
        setFetched(true);
        return () => {
            // console.log("Byee Room")
            // if (connections) {
            //     connections.forEach((value) => {
            //         value.close();
            //     })
            // }
            // console.log('Room unmounted:');
            dispatch(closeMedia());
            dispatch(getUserMedia(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     const sa = Array.from(remoteStreams);
    //     for (const videoElement in videoRefArray) {
    //         videoRefArray[videoElement].current.srcObject = sa[videoElement][1][0];
    //     }
    // })

    const createSocket = () => {
        //Socket(isLogged? "START" : "JOIN", id, roomId, connections, updateConnection, addStream, deleteStream, localStream, iceServers);
        dispatch(connectSocket({ action: isRoomOwner ? 'START' : 'JOIN', id: id, roomId: roomId, displayName: name }))
        if (isRoomOwner || !isRoomLocked)
            setStartRoomView(true);
        else
            setShowWaiting(true);
    }
    return (
        !startRoomView ?
        <LayoutDefault>
            {!fetched ? <></> : <RoomEntry acceptEntry={acceptEntry} showWaiting={showWaiting} logged={isLogged} createSocket={createSocket} iceSuccess={iceSuccess} mediaSuccess={mediaSuccess} setMediaSuccess={setMediaSuccess}/>}
        </LayoutDefault>
        : <RoomView/>
    );
}

export default Room;