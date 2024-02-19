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
    const enterRoom = async ({room_id}: {room_id: string}) => {
        navigate(`/room/${room_id}`)
    }
    useEffect(() => {
        const peer_id = uuidV4()
        const peerInstance = new Peer(peer_id)

        setPeer(peerInstance)
        ws.on('room-created', enterRoom)
    }, [])
    return (
        <RoomContext.Provider value={{ ws, peer }}>
            {children}
        </RoomContext.Provider>
    );
}