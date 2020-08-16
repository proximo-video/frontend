import React from 'react';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input'
import PersonalMedia from './PersonalMedia';
import {useDispatch,useSelector} from 'react-redux';
import {setName} from '../redux/actions';

const RoomEntry = (props) => {
    const isRoomOwner  = useSelector((state)=>state.isRoomOwner);
    const dispatch = useDispatch();
    const nameInputHandler = (e)=>{
        dispatch(setName(e.target.value));
    }
    return (
        <>
            <div className="section">
                <div className="room-entry-container card has-background-dark">
                    <div className="card-content">
                        <PersonalMedia mediaSuccess={props.mediaSuccess} setMediaSuccess={props.setMediaSuccess}></PersonalMedia>
                        {props.logged?<></>:<label className="has-text-white"><Input onChange={nameInputHandler} placeholder="Name" className="input mt-32"></Input></label>}
                        <Button color="primary" wide className={"mt-32"} disabled={!(props.mediaSuccess && props.iceSuccess)} onClick={props.createSocket}>{isRoomOwner?'Start':'Join'}</Button>
                        {props.showWaiting&&"Waiting"}
                    </div>
                </div>
            </div>
        </>
    )

}

export default RoomEntry
