import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {RoomContext} from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";

export const Room: React.FC = () => {
    const {id} = useParams()
    const {ws, peer, stream} = useContext(RoomContext)
    useEffect(() => {
        if (peer){
            ws.emit('join-room', {room_id: id, peer_id: peer._id})
        }
    }, [id, peer, ws])
    return (
        <>
            Room Id ${id}
            <div>
                <VideoPlayer stream={stream}/>
            </div>
        </>
    )
}