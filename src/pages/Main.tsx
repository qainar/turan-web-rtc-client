import {Button} from "../components/Button";
import React from "react";

export const Main: React.FC = () => {
    return (
        <div className="App flex items-center justify-center h-screen w-screen bg-zinc-800">
            <Button text={'Click for join meet'}/>
        </div>
    )
}