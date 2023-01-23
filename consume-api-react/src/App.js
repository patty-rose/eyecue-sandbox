import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/Home';
import Form from './pages/Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
