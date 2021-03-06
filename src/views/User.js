import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '../components/elements/Switch';
import Button from '../components/elements/Button';
import Modal from '../components/elements/Modal';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setRooms, setId, error } from '../redux/actions';
import { Error } from "./Room/Notification/NotificationManager";
import { Redirect } from "react-router-dom";
import { httpRequestError } from '../ErrorsList';


function GenRooms(props) {
    const [showToggleLoader, setShowToggleLoader] = useState(false);

    const handleToggleRoomClick = async (e, id) => {
        setShowToggleLoader(true);
        const ele = e.target;
        ele.setAttribute("disabled", true);
        await props.toggleRoom(id);
        ele.removeAttribute("disabled");
        setShowToggleLoader(false);
    }

    return (
        <div className="card has-background-dark mb-32">
            <div className="card-content">
                <div className="level">
                    <div className="level-left room-name-div">
                        <span className="has-text-white-ter	">{props.room_id}</span>
                    </div>
                    <div className="level-right">
                        <div className="margin-bottom-mobile m-16 room-lock-toggle">
                            {
                                showToggleLoader ?
                                    <div className="toggle-lock-loader" />
                                    :
                                    <Switch roomid={props.room_id} className="has-text-white-ter mr-6"
                                        checked={props.is_locked || false} onChange={(e) => handleToggleRoomClick(e, props.room_id)}>
                                        {props.is_locked ? "Locked" : "Open"}
                                    </Switch>
                            }
                        </div>
                        <div className={"card-buttons"}>
                            <div className=" m-8"><Button color="primary goto-room-button"><Link to={{ pathname: "/" + props.room_id }}>Go To Room</Link></Button></div>
                            <Button color="danger delete-room-button" className="ml-8" roomid={props.room_id} onClick={props.openDeleteModal}><FaTrash className="has-text-white" /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function User(props) {
    const dispatch = useDispatch();
    // const id = useSelector(state => state.id);
    const name = useSelector(state => state.name);
    const rooms = useSelector(state => state.rooms);
    const isLogged = useSelector(state => state.isLogged);
    const [showModal, setShowModal] = useState(false);
    const [deleteRoomId, setDeleteRoomId] = useState("");
    const [roomIdInput, setRoomIdInput] = useState("");
    const [showAddRoomLoader, setShowAddRoomLoader] = useState(false);
    const [showRoomNameWarning, setShowRoomNameWarning] = useState(false);

    const roomInputHandle = (event) => {
        const roomId = event.target.value.trim();
        setRoomIdInput(event.target.value);
        if (roomId !== '' && roomId.match(/^[0-9a-zA-Z]+$/)) {
            event.target.style.border = '3px solid green';
            setShowRoomNameWarning(false);
        }
        else if (roomId !== '')
            setShowRoomNameWarning(true);
        else if (roomId === '') {
            event.target.style.border = 'none';
            setShowRoomNameWarning(false);
        }
    }

    const fetchData = async () => {
        try {
            let response = await fetch('https://api.proximo.pw/getUser', { credentials: 'include' });
            if (response.ok) {
                let data = await response.json()
                // console.log(data);
                // console.log("id", id);
                dispatch(setId(data.id));
                dispatch(setName(data.name));
                if (data.rooms)
                    dispatch(setRooms(data.rooms));
                else
                    dispatch(setRooms([]));
            }
            else {
                props.history.push("/");
            }
        } catch (e) {
            dispatch(error(httpRequestError));
        }
    }
    const addRoom = async (e) => {
        e.preventDefault();
        const element = e.target;
        const roomName = roomIdInput.trim();
        if (roomName !== '' && roomName.match(/^[0-9a-zA-Z]+$/)) {
            if (rooms.length >= 3) {
                Error("generic-error-notification", "Can't proceed request. At max 3 private rooms are allowed.", "Error", 5000);
                setRoomIdInput("");
                document.getElementById('room-name-input').style.border = 'none';
            }
            else if (roomName === 'user' || roomName === 'privacy-policy' || roomName === 'about-us' || roomName === 'login' || roomName === 'error' || roomName === 'welcome') {
                Error("generic-error-notification", `Room name: ${roomName} not allowed.`, "Error", 5000);
                setRoomIdInput("");
                document.getElementById('room-name-input').style.border = 'none';
            }
            else {
                setShowRoomNameWarning(false);
                setShowAddRoomLoader(true);
                element.setAttribute("disabled", "true");
                try {
                    let response = await fetch('https://api.proximo.pw/newRoom', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({ room_id: roomName, is_locked: true })
                    });
                    if (response.ok) {
                        await fetchData();
                    }
                    else if (response.status === 409) {
                        Error("generic-error-notification", "Room already exists.", "Error", 5000);
                    }
                    else if (response.status === 406) {
                        Error("generic-error-notification", "Can't complete request. At max 3 private rooms are allowed.", "Error", 5000);
                    }
                    else if (response.status === 400) {
                        Error("generic-error-notification", "Bad request.", "Error", 5000);
                    }
                    else {
                        Error("generic-error-notification", "Internal server error.", "Error", 5000);
                    }
                    setRoomIdInput("");
                    document.getElementById('room-name-input').style.border = 'none';
                    element.removeAttribute("disabled");
                    setShowAddRoomLoader(false);
                } catch (e) {
                    dispatch(error(httpRequestError))
                }
            }
        } else {
            // alert("Enter numbers and alphabets only.");
            setShowRoomNameWarning(true);
        }
    }

    const toggleRoom = async (id) => {
        try {
            let response = await fetch('https://api.proximo.pw/toggle', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ room_id: id })
            });
            if (response.ok) {
                await fetchData();
            }
            else if (response.status === 404) {
                Error("generic-error-notification", "Room not found.", "Error", 5000);
            }
            else if (response.status === 400) {
                Error("generic-error-notification", "Bad request.", "Error", 5000);
            }
            else {
                Error("generic-error-notification", "Internal server error.", "Error", 5000);
            }
        } catch (e) {
            dispatch(error(httpRequestError))
        }
    }

    const openDeleteModal = (id) => {
        setDeleteRoomId(id);
        setShowModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteRoomId("");
        setShowModal(false);
    }

    const deleteRoom = async (e) => {
        const element = e.target;
        element.setAttribute("disabled", "true")
        try {
            let response = await fetch('https://api.proximo.pw/deleteRoom', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({ room_id: deleteRoomId })
            });
            if (response.ok) {
                await fetchData();
            }
            else if (response.status === 404) {
                Error("generic-error-notification", "Room not found.", "Error", 5000);
            }
            else if (response.status === 400) {
                Error("generic-error-notification", "Bad request.", "Error", 5000);
            }
            else {
                Error("generic-error-notification", "Internal server error.", "Error", 5000);
            }
        } catch (e) {
            dispatch(error(httpRequestError))
        }
        setDeleteRoomId("");
        element.removeAttribute("disabled");
        setShowModal(false);
    }


    const showDeleteModal = () => {
        return (
            <Modal className={"room-delete-modal"} show={showModal} handleClose={closeDeleteModal}>
                <div>
                    <h3>Warning</h3>
                    <p>{deleteRoomId} will be deleted</p>
                    <div className={"delete-modal-buttons"}>
                        <Button color="danger" onClick={deleteRoom} className="m-8">Delete</Button>
                        <Button onClick={closeDeleteModal} className="m-8">Cancel</Button>
                    </div>
                </div>
            </Modal>
        )
    }

    return isLogged ? (
        <div className="section">
            <div className="container user-rooms">
                <h2 className={"h2-message"}>Welcome {name}</h2>
                <h6 className={"h6-message"}>Create your private rooms here.</h6>
                <p className={"x-small-message"}>*At max 3 private rooms are allowed per user.</p>
                <div className="input-area">
                    <label className={"input-label"} style={showRoomNameWarning ? { display: 'block' } : {}}>
                        Room name can only be alphanumeric:
                    </label>
                    <form onSubmit={addRoom} className={"input-area-form"}>
                        <input
                            id={"room-name-input"}
                            className={"form-input"}
                            value={roomIdInput}
                            onChange={roomInputHandle}
                            placeholder={"Room Name"}
                            style={showRoomNameWarning ? { border: '3px solid #f26b4c' } : {}}
                        />
                        <Button color="primary add-room-button" onClick={addRoom}>Create Room</Button>
                    </form>
                    {showDeleteModal()}
                </div>
                <div className={"rooms"}>
                    {showAddRoomLoader && <><div className="add-room-loader" /><h6>Creating room. Please wait.</h6></>}
                    <p className={"small-message" + (rooms.length !== 0 ? ' empty-rooms-message' : '')}>{rooms.length === 0 ? 'Your rooms will be displayed here.' : 'These are your rooms.'}</p>
                    {rooms.length === 0 && <p className={"small-message"}>Go on! Create one.</p>}
                    {rooms.length !== 0 && <p className={"x-small-message"}>*At max 4 people are allowed at a time per room.</p>}
                    {rooms ? rooms.map((value, key) => <GenRooms key={key} room_id={value.room_id} is_locked={value.is_locked} toggleRoom={toggleRoom} openDeleteModal={() => openDeleteModal(value.room_id)} />) : <></>}
                </div>
            </div>
        </div>
    ) : <Redirect to='/login' />;

}

export default User;