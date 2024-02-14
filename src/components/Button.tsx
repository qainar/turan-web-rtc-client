import React, {useContext} from "react";
import {RoomContext} from "../context/RoomContext";
interface ButtonProps {
    text: string
}
export const Button: React.FC<ButtonProps> = ({text}) => {
    const {ws} = useContext(RoomContext)
    const createRoom = () => {
        ws.emit('create-room')
    }
    return (
        <button
            onClick={createRoom}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            {text}
        </button>
    )
}