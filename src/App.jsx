import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Layout from './pages/Layout';
import Register from './pages/Register';
import './App.css'
import { SearchBar } from './components/SearchBar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App