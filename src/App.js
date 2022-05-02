import './App.css';

import Sidebar from './components/sidebar/Sidebar';
import { Login } from './components/Login/Login';
import  SignIn  from './components/SignIn/SignIn'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {  useSelector } from "react-redux";
function App() {
  const { user } = useSelector((state) => state.user);

  return (

    <Router>
      <div className="App">
       
          <Routes >

           
            <Route exact path='/' element = {<Login />}/>
            <Route exact path='/create' element = {<SignIn />}/>
            { user? <Route exact path='/home/*' element = {<Sidebar/>}/> : <></>}
            
          </Routes>
      </div>   
    </Router>  

   
  );
}

export default App;
