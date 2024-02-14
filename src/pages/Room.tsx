import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {RoomContext} from "../context/RoomContext";

export const Room: React.FC = () => {
    const {id} = useParams()
    const {ws} = useContext(RoomContext)
    useEffect(() => {
        ws.emit('join-room', {room_id: id})
    }, [])
    return (
        <>Room Id ${id}</>
    )
}