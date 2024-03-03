import SocketIoClient from "socket.io-client";
import React, {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import Peer from "peerjs";
import {v4 as uuidV4} from 'uuid'
import { peersReducer } from "./peerReducer";
import { addPeerActions, removePeerActions } from "./peerAction";
const SERVER_URL = 'http://localhost:4020'

export const RoomContext = createContext<null | any>(null)

const ws = SocketIoClient(SERVER_URL)

export const RoomProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const navigate = useNavigate()
    const [peer, setPeer] = useState<Peer>()
    const [stream, setStream] = useState<MediaStream>()
    const [peers, dispatch] = useReducer(peersReducer, {})

    const enterRoom = async ({room_id}: {room_id: string}) => {
        navigate(`/room/${room_id}`)
    }
    const getUsers = ({participants}: {participants: string[]}) => {
        console.log(participants)
    }
    const removePeer = (peer_id: string) => {
        dispatch(removePeerActions(peer_id))
    }
    useEffect(() => {
        const peer_id = uuidV4()
        const peerInstance = new Peer(peer_id)
        
        setPeer(peerInstance)

        try{
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then((stream) => {
                setStream(stream)
            })
        }catch(error){
            console.error(error);
            
        }
        ws.on('room-created', enterRoom)
        ws.on('get-users', getUsers)
        ws.on('user-disconnected', removePeer)
    }, [])

    useEffect(() => {
        if(!peer) return
        if(!stream) return

        ws.on("user-joined", ({peer_id}) => {
            const call = peer.call(peer_id, stream)
            call.on('stream', (peerStream) => {
                dispatch(addPeerActions(peer_id, peerStream))
            })
        })

        peer.on('call', (call) => {
            call.answer(stream)
            call.on('stream', (peerStream) => {
                dispatch(addPeerActions(call.peer, peerStream))
            })
        })
    }, [peer, stream])

    console.log({peers})
    return (
        <RoomContext.Provider value={{ ws, peer, stream, peers }}>
            {children}
        </RoomContext.Provider>
    );
}