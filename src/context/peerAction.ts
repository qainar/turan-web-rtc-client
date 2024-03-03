export const ADD_PEER = 'ADD_PEER' as const
export const REMOVE_PEER = 'REMOVE_PEER' as const

export const addPeerActions = (peer_id: string, stream: MediaStream) => ({
    type: ADD_PEER,
    payload: {
        peer_id, 
        stream
    }
})

export const removePeerActions = (peer_id: string) => ({
    type: REMOVE_PEER,
    payload: {
        peer_id, 
    }
})