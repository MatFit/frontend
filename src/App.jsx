import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'
import Home from './pages/home';
import Login from './pages/login';
import Layout from './pages/layout';
import Register from './pages/register';
import Page_404 from './pages/404';
import { TickerModal } from './components/TickerModal';
import { SearchBar } from './components/SearchBar';
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<TickerModal />} />
        <Route path="*" element={<Page_404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App