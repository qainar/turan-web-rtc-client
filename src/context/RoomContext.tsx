import SocketIoClient from "socket.io-client";
import React, {createContext, ReactNode, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Peer from "peerjs";
import {v4 as uuidV4} from 'uuid'
const SERVER_URL = 'http://localhost:4020'

export const RoomContext = createContext<null | any>(null)

const ws = SocketIoClient(SERVER_URL)

export const RoomProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const navigate = useNavigate()
    const [peer, setPeer] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()
    const enterRoom = async ({room_id}: {room_id: string}) => {
        navigate(`/room/${room_id}`)
    }
    const getUsers = ({participants}: {participants: string[]}) => {
        console.log(participants)
    }
    useEffect(() => {
        const peer_id = uuidV4()
        const peerInstance = new Peer(peer_id)

        setPeer(peerInstance)
        ws.on('room-created', enterRoom)
        ws.on('get-users', getUsers)
    }, [])
    return (
        <RoomContext.Provider value={{ ws, peer }}>
            {children}
        </RoomContext.Provider>
    );
}