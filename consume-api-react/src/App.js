import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/Home';
import Form from './pages/Form';
import io from 'socket.io-client'

const socket = io('http://localhost:3001')
socket.on('new-user', (data) => {
  console.log(data);
});


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
