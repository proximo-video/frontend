import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from '../components/elements/Switch';
import Button from '../components/elements/Button';
import Modal from '../components/elements/Modal';
import Input from '../components/elements/Input';
import { FaTrash } from 'react-icons/fa';
import {useDispatch,useSelector} from 'react-redux';
import {setName,setRooms,setId} from '../redux/actions';


function User(props) {
    const dispatch = useDispatch();
    const id = useSelector(state=>state.id);
    const name = useSelector(state=>state.name);
    const rooms = useSelector(state=>state.rooms);
    const isLogged = useSelector(state=>state.isLogged);
    const [showModal,setShowModal] =useState(false);
    const [deleteRoomId, setDeleteRoomId] = useState("");
    const [roomIdInput, setRoomIdInput] = useState("");

    const roomInputHandle = (event) => {
        setRoomIdInput(event.target.value)
    }

    const fetchData = async () => {
        let response = await fetch('https://proximo-video.herokuapp.com/getUser', { credentials: 'include' });
        if (response.ok) {
            let data = await response.json()
            console.log(data);
            console.log("id", id);
            dispatch(setId(data.id));
            dispatch(setName(data.name));
            if (data.rooms)
            dispatch(setRooms(data.rooms));
        }
        else {
            props.history.push("/");
        }
    }
    const addRoom = async (e) => {
        const element = e.target;
        element.setAttribute("disabled", "true")
        console.log(element)
        console.log("Clicked")
        let response = await fetch('https://proximo-video.herokuapp.com/newRoom', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ room_id: roomIdInput, is_locked: false })
        });
        if (response.ok) {
            setRoomIdInput("");
            fetchData();
        }
        element.removeAttribute("disabled");
    }

    const toggleRoom = async (e) => {
        const element = e.target;
        const id = element.getAttribute("roomid")
        element.setAttribute("disabled", true);
        let response = await fetch('https://proximo-video.herokuapp.com/toggle', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ room_id: id })
        });
        if (response.ok) {
            fetchData();
        }
        element.removeAttribute("disabled");
    }

    const openDeleteModal = (e) => {
        const id = e.currentTarget.getAttribute("roomid");
        console.log(id);
        setDeleteRoomId(id);
        setShowModal(true);
    }

    const closeDeleteModal = () => {
        setDeleteRoomId("");
        setShowModal(false);
    }

    const deleteRoom = async(e)=>{
        const element = e.target;
        element.setAttribute("disabled", "true")
        let response = await fetch('https://proximo-video.herokuapp.com/deleteRoom', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ room_id: deleteRoomId })
        });
        if (response.ok) {
            fetchData();
        }
        setDeleteRoomId("");
        element.removeAttribute("disabled");
        setShowModal(false);
    }


    const showDeleteModal = () => {
        return (
                <Modal show={showModal} handleClose={closeDeleteModal}>
                    <div>                
                            <h3>Warning</h3>
                       
                            <p>{deleteRoomId} will be deleted</p>
                        
                            <Button color="danger" onClick={deleteRoom} className="m-8">Delete</Button>
                            <Button onClick={closeDeleteModal}  className="m-8">Cancel</Button>
                      
                    </div>
                </Modal>
        )
    }

    const genRooms = (value, key) => {
        return (
            <div className="card has-background-dark mb-32" key={key}>
                <div className="card-content">
                    <div className="level">
                        <div className="level-left">
                            <span className="has-text-white-ter	">{value.room_id}</span>
                            
                        </div>
                        <div className="level-right">
                            <div className="margin-bottom-mobile m-16"><Switch roomid={value.room_id} className="has-text-white-ter mr-6" checked={value.is_locked || false} onChange={toggleRoom}>{value.is_locked ? "Locked" : "Open"}</Switch></div>
                            <div className=" m-8"><Button color="primary"><Link to={{ pathname: "/" + value.room_id }}>Go To Room</Link></Button></div>
                            <Button color="danger" className="ml-8" roomid={value.room_id} onClick={openDeleteModal}><FaTrash className="has-text-white"/></Button>
                        </div>
                    </div>
                </div>
            </div>)
    }

    return isLogged ? (
        <div className="section">
            <div className="container">
                <div className="h2 mb-32  ta-c">Welcome {name}</div>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <Input value={roomIdInput} onChange={roomInputHandle}></Input>
                    </div>
                    <div className="column ta-c">
                        <Button color="primary" onClick={addRoom}>Add Room</Button>
                    </div>
                    {showDeleteModal()}
                </div>
                {rooms ? rooms.map((value, key) => genRooms(value, key)) : <></>}
            </div>
        </div>
    ) : <></>;

}

export default User;