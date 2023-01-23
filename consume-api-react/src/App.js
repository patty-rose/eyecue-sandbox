import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/Home';
import User from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
