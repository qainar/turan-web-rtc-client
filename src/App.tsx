import React, {useEffect} from 'react';
import './App.css';
import SocketIo from "socket.io-client";
const SERVER_URL = 'http://localhost:4020'
function App() {
    useEffect(() => {
        SocketIo(SERVER_URL)
    }, [])
  return (
    <div className="App">
      <header className="App-header">
        <p>
          dsds
        </p>
      </header>
    </div>
  );
}

export default App;
