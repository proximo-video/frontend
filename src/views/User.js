import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

function User(props) {

    const [id, setID] = useState(0);
    const [roomIdInput, setRoomIdInput] = useState("");
    const [name, setName] = useState("");
    const [rooms, setRooms] = useState([]);
    const [isAuth, setAuth] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch('https://proximo-video.herokuapp.com/getUser', { credentials: 'include' });
            if (response.ok) {
                let data = await response.json()
                console.log(data);
                console.log("id",id);
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
        fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const roomInputHandle = (event) => {
        setRoomIdInput(event.target.value)
    }

    const addRoom = async () => {
        console.log("Clicked")
        let response = await fetch('https://proximo-video.herokuapp.com/newRoom', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ room_id: roomIdInput, is_locked: "false" })
        });
        if (response.ok) {
            setRooms([...rooms,{room_id:roomIdInput,is_locked:"false"}])
            setRoomIdInput("")
        }
    }

    return isAuth ? (
        <div className="section">
            <div className="container center-content">
                <div>Welcome {name}</div>
                <input value={roomIdInput} onChange={roomInputHandle} className="form-input"></input>
                <button className="button button-primary" onClick={addRoom}>Add Room</button>
                {rooms?rooms.map((value,key)=><div key={key}><Link key={key} to={{pathname:"/"+value.room_id}}>{value.room_id}</Link></div>):<></>}
            </div>
        </div>
    ) : <></>;

}

export default User;