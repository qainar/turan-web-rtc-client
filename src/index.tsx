import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RoomProvider} from "./context/RoomContext";
import {BrowserRouter} from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <RoomProvider>
              <App />
          </RoomProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
