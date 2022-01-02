import React from 'react'
import './App.css';
import Header from './components/Header';
import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import Hero from './components/Hero';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path="/" element={<><Header /><Hero /> </> }  />
            <Route exact path="/channels" element={ <Home /> } />
            <Route exact path="/channels/:id" element={ <Home /> } />
          </Routes>
      </Router>
     
    </div>
  );
}

export default App;
