import SocketIoClient from "socket.io-client";
import React, {createContext, ReactNode, useEffect} from "react";
import {useNavigate} from "react-router-dom";
const SERVER_URL = 'http://localhost:4020'

export const RoomContext = createContext<null | any>(null)

const ws = SocketIoClient(SERVER_URL)

export const RoomProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const navigate = useNavigate()
    const enterRoom = async ({room_id}: {room_id: string}) => {
        navigate(`/room/${room_id}`)
    }
    useEffect(() => {
        ws.on('room-created', enterRoom)
    }, [])
    return (
        <RoomContext.Provider value={{ ws }}>
            {children}
        </RoomContext.Provider>
    );
}