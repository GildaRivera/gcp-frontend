import './App.css';
import React  from 'react';
import Sidebar from './components/sidebar/Sidebar';
import { Login } from './components/Login/Login';
import  SignIn  from './components/SignIn/SignIn'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import store from "./redux/index"
import { Provider } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import {  useSelector } from "react-redux";
const dotenv = require("dotenv");
// get config vars
dotenv.config();
const ENDPOINT = process.env.REACT_APP_ENDPOINT_API;
function App() {
  console.log(ENDPOINT)
  const { user } = useSelector((state) => state.user);
  console.log("user",user)
  return (

      <Router>
        <div className="App">
          <Routes >
            <Route exact path='/' element = {<Login />}/>
            <Route exact path='/create' element = {<SignIn />}/>
            { user ? <Route exact path='/home/*' element = {<Sidebar/>}/> : <></>}
          </Routes>
        </div>   
      </Router>
 
  );
}

export default App;
