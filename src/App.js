import React, { Component }  from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Password from "./screens/password";
import DisplayPassword from './screens/displaypassword';
import Dashboard from './screens/dashboard'; 
function App() {
  return (
   <div>
    <Router>
      <Routes>          
        <Route element={<Password/>} path="/Password"/>          
        <Route element={<DisplayPassword/>} path="/displaypassword"/>          
        <Route element={<Dashboard/>} path="/dashboard/*"/>          
      </Routes>
    </Router>
   </div>  
  );
}

export default App;
