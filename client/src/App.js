import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Accueil } from './components/Accueil';
import { Navbar } from './components/Navbar';
import { Users } from './components/User';


function App() {
  return (
    <Router>
      <Navbar/>
      <div className="container p-4">
        <Routes name="contenido dinamico">
          <Route path="/" exact element={<Accueil/>}/>
          <Route path="/users" exact element={<Users/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;