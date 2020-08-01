import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import Switch from '../components/elements/Switch';
import Button from '../components/elements/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function User(props) {
    const modalRef = useRef();
    const [deleteRoomId, setDeleteRoomId] = useState("");
    const [id, setID] = useState(0);
    const [roomIdInput, setRoomIdInput] = useState("");
    const [name, setName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [isAuth, setAuth] = useState(false);
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const roomInputHandle = (event) => {
        setRoomIdInput(event.target.value)
    }
    const fetchData = async () => {
        let response = await fetch('https://proximo-video.herokuapp.com/getUser', { credentials: 'include' });
        if (response.ok) {
            let data = await response.json()
            console.log(data);
            console.log("id", id);
            setID(data.id);
            setName(data.name);
            if (data.rooms)
                setRooms(data.rooms);
            setAuth(true)
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
        console.log(id)
        modalRef.current.classList.add("is-active");
        setDeleteRoomId(id)
        console.log(modalRef)
    }

    const closeDeleteModal = () => {
        setDeleteRoomId("");
        modalRef.current.classList.remove("is-active");
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
        modalRef.current.classList.remove("is-active");
    }


    const showDeleteModal = () => {
        return (
                <div ref={modalRef} className="modal">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Warning</p>
                            <button onClick={closeDeleteModal} className="delete" aria-label="close"></button>
                        </header>
                        <section className="modal-card-body">
                            {deleteRoomId} will be deleted
                        </section>
                        <footer className="modal-card-foot">
                            <button onClick={deleteRoom} className="button is-danger">Delete</button>
                            <button onClick={closeDeleteModal} className="button">Cancel</button>
                        </footer>
                    </div>
                </div>
        )
    }

    const genRooms = (value, key) => {
        return (
            <div className="card has-background-dark mb-3" key={key}>
                <div className="card-content">
                    <div className="level">
                        <div className="level-left">
                            <span className="has-text-white-ter	">{value.room_id}</span>
                            <button className="ml-6 button is-danger" roomid={value.room_id} onClick={openDeleteModal}><FontAwesomeIcon className="has-text-white" icon={faTrash} /></button>
                        </div>
                        <div className="level-right">
                            <div className="margin-bottom-mobile"><Switch roomid={value.room_id} className="has-text-white-ter mr-6" checked={value.is_locked || false} onChange={toggleRoom}>{value.is_locked ? "Locked" : "Open"}</Switch></div>
                            <div className="has-text-centered"><Button color="primary"><Link to={{ pathname: "/" + value.room_id }}>Go To Room</Link></Button></div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    return isAuth ? (
        <div className="section">
            <div className="container">
                <div className="is-size-3 is-size-4-mobile mb-5 has-text-centered">Welcome {name}</div>
                <div className="columns">
                    <div className="column is-four-fifths">
                        <input value={roomIdInput} onChange={roomInputHandle} className="input"></input>
                    </div>
                    <div className="column has-text-center">
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