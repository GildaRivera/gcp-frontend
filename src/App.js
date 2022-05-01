import './App.css';
import {store} from './redux/store'
import { Provider } from 'react-redux'
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Router>
      <div className="App">
       
          <Routes >
            {/* <Route exact path='/' element={< Login />}></Route> 
            <Route exact path='/signUp' element={< SingUp />}></Route> */}
            {/* localStorage.getItem('user') */ true ? <Route exact path='/home/*' element = {<Sidebar/>}/> : <></>}
          </Routes>
      </div>   
    </Router>
   
  );
}

export default App;
