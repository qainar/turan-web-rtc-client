import { ADD_PEER, REMOVE_PEER } from "./peerAction"


export type PeerState = Record<string, {stream: MediaStream}>
type PeerAction = | {
    type: typeof ADD_PEER,
    payload: {
        peer_id: string, 
        stream: MediaStream
    }
} | {
    type: typeof REMOVE_PEER,
    payload: {
        peer_id: string
    }
}

export const peersReducer = (state: PeerState, action: PeerAction) => {
    switch (action.type){
        case ADD_PEER: 
            return {
                ...state,
                [action.payload.peer_id]: {
                    stream: action.payload.stream
                }
            }
        case REMOVE_PEER: {
            const {[action.payload.peer_id]: deleted, ...rest} = state
            return rest
        }
        default:
            return {...state}
    }
}