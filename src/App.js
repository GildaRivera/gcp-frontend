import './App.css';
import store from "./redux/index"
import { Provider } from 'react-redux'
import Sidebar from './components/sidebar/Sidebar';
import { Login } from './components/Login/Login';
import  SignIn  from './components/SignIn/SignIn'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Provider store={store}>
    <Router>
      <div className="App">
       
          <Routes >
            {/* <Route exact path='/' element={< Login />}></Route> 
            <Route exact path='/signUp' element={< SingUp />}></Route> */}
            <Route exact path='/' element = {<Login />}/>
            <Route exact path='/create' element = {<SignIn />}/>
            {/* localStorage.getItem('user') */ true ? <Route exact path='/home/*' element = {<Sidebar/>}/> : <></>}
            
          </Routes>
      </div>   
    </Router>  </Provider>
   
  );
}

export default App;