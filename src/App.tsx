import React from 'react';
import './App.css';
import {Main} from "./pages/Main";
import {Route, Routes} from "react-router-dom";
import {Room} from "./pages/Room";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/room/:id' element={<Room/>} />
    </Routes>
  );
}

export default App;
