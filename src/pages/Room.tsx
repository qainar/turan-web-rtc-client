import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {RoomContext} from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../context/peerReducer";

export const Room: React.FC = () => {
    const {id} = useParams()
    const {ws, peer, stream, peers} = useContext(RoomContext)
    useEffect(() => {
        if (peer){
            ws.emit('join-room', {room_id: id, peer_id: peer._id})
        }
    }, [id, peer, ws])
    return (
        <>
            Room Id ${id}
            <div className="grid grid-cols-4 gap-4">
                <VideoPlayer stream={stream}/>
                
                {Object.values(peers as PeerState).map(peer => (
                    <VideoPlayer stream={peer.stream}/>
                ))}
            </div>
        </>
    )
}
