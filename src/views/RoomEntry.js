import React from 'react';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input'
import PersonalMedia from './PersonalMedia';
import {useDispatch,useSelector} from 'react-redux';
import {setName} from '../redux/actions';
import '../assets/scss/custom/roomEntry.scss';

const RoomEntry = (props) => {
    const isRoomOwner  = useSelector((state)=>state.isRoomOwner);
    const dispatch = useDispatch();
    const nameInputHandler = (e)=>{
        dispatch(setName(e.target.value));
    }
    return (
        <>
            <div className="section room-entry">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess}/>
                        <div className="room-entry-form">
                            {props.logged?<></>:<Input onChange={nameInputHandler} placeholder="Name" className="input mt-32"/>}
                            <Button color="primary" wide className={"mt-32 join-button"} disabled={!(props.mediaSuccess && props.iceSuccess)} onClick={props.createSocket}>{isRoomOwner?'Start':'Join'}</Button>
                            {props.showWaiting&&"Waiting"}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default RoomEntry
